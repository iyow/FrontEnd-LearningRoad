# 根据平台的支持，Python 支持 3 种启动进程的方式：

# 1) spawn，父进程会启动一个全新的 Python 解释器进程。
# 在这种方式下，子进程只能继承那些处理 run() 方法所必需的资源。
# 典型的，那些不必要的文件描述器和 handle 都不会被继承。
# 使用这种方式来启动进程，其效率比使用 fork 或 forkserver 方式要低得多
# （Windows 只支持 spawn 方式来启动进程，因此在 Windows 平台上默认使用这种方式来启动进程。）

# 2) fork
# 父进程使用 os.fork() 来启动一个 Python 解释器进程。
# 在这种方式下，子进程会继承父进程的所有资源，因此子进程基本等效于父进程。
# 这种方式只在 UNIX 平台上有效，UNIX 平台默认使用这种方式来启动进程。

# 3) forkserver
# 如果使用这种方式来启动进程，程序将会启动一个服务器进程。
# 在以后的时间内，当程序再次请求启动新进程时，
# 父进程都会连接到该服务器进程，请求由服务器进程来 fork 新进程。
# 通过这种方式启动的进程不需要从父进程继承资源。这种方式只在 UNIX 平台上有效。

# 总结
# 如果程序使用 UNIX 平台（包括 Linux 和 Mac OS X），
# Python 支持三种启动进程的方式；
# 但如果使用 Windows 平台，则只能使用效率最低的 spawn 方式。
# multiprocessing 模块提供了一个set_start_method() 函数，
# 该函数可用于设置启动进程的方式（必须将这行设置代码放在所有与多进程有关的代码之前）。
from concurrent.futures import ProcessPoolExecutor
import time
import multiprocessing
import os
# 方式一： 类unix系统
print('父进程（%s）开始执行' % os.getpid())
# 开始fork一个子进程
# 从这行代码开始，下面代码都会被两个进程执行---返回值：子进程0,主(父)进程返回的是子进程pid
pid = os.fork()
print('进程进入：%s' % os.getpid())
# 如果pid为0，表明子进程
if pid == 0:
    print('子进程，其ID为 (%s)， 父进程ID为 (%s)' % (os.getpid(), os.getppid()))
else:
    # 回收子进程资源　　阻塞
    #pid, result = os.wait()
    print('我 (%s) 创建的子进程ID为 (%s).' % (os.getpid(), pid))
print('进程结束：%s' % os.getpid())


# 方式二： 抹平操作系统差异
# ①以指定函数作为target创建新进程
# 子进程执行体
def action(max):
    for i in range(max):
        print("(%s)子进程（父进程:(%s)）：%d" %
              (os.getpid(), os.getppid(), i))


if __name__ == '__main__':
    # 下面是主程序（也就是主进程）
    for i in range(100):
        print("(%s)主进程: %d" % (os.getpid(), i))
        if i == 20:
            # 创建并启动第一个进程
            # 可以设置 启动进程 方式
            # multiprocessing.set_start_method('spawn')
            # mp = multiprocessing.Process(target=action, args=(100, ))
            # 或者 使用ctx = multiprocessing.get_context('fork')
            # mp = ctx.Process(target=action, args=(100, ))
            mp1 = multiprocessing.Process(target=action, args=(100,))
            mp1.start()
            # 创建并启动第一个进程
            mp2 = multiprocessing.Process(target=action, args=(100,))
            mp2.start()
            mp2.join()
    print('主进程执行完成!')


# ②继承Process类创建子进程
class MyProcess(multiprocessing.Process):
    def __init__(self, max):
        self.max = max
        super().__init__()

    # 重写run()方法作为进程执行体
    def run(self):
        for i in range(self.max):
            print("(%s)子进程（父进程:(%s)）：%d" %
                  (os.getpid(), os.getppid(), i))


if __name__ == '__main__':
    # 下面是主程序（也就是主进程）
    for i in range(100):
        print("(%s)主进程: %d" % (os.getpid(), i))
        if i == 20:
            # 创建并启动第一个进程
            mp1 = MyProcess(100)
            mp1.start()
            # 创建并启动第一个进程
            mp2 = MyProcess(100)
            mp2.start()
            mp2.join()
    print('主进程执行完成!')


# ③进程池POOL (多个进程)
# concurrent.futures模块的基础是Exectuor，Executor是一个抽象类，它不能被直接使用
# 提供的两个子类ThreadPoolExecutor和ProcessPoolExecutor却是非常有用
# 两者分别被用来创建线程池和进程池的代码。
# 实现了对threading和multiprocessing的进一步抽象，对编写线程池/进程池提供了直接的支持。

# 用futures的写法上更简洁一些,concurrent.futures的性能并没有更好,
# 只是让编码变得更简单。考虑并发编程的时候,任何简化都是好事。
# 从长远来看,concurrent.futures编写的代码更容易维护。
# 使用map时,future是逐个迭代提交,multiprocessing.Pool是批量提交jobs,
# 因此对于大批量jobs的处理,multiprocessing.Pool效率会更高一些。
# 对于需要长时间运行的作业,用future更佳

def work(msg):
    mult_proces_name = multiprocessing.current_process().name
    print('process: ' + mult_proces_name + '-' + msg)
    return mult_proces_name + '-' + msg


if __name__ == "__main__":
    pool = multiprocessing.Pool(processes=4)  # 创建4个进程
    results = []
    for i in range(20):
        msg = "process %d" % (i)
        # 结果就是返回pool中所有进程的值的对象（注意是对象，不是值本身）
        # pool.apply(work, (msg, ))阻塞版本
        return_value = pool.apply_async(work, (msg, ))
        results.append(return_value)
    pool.close()  # 关闭进程池，表示不能再往进程池中添加进程，需要在join之前调用
    pool.join()  # 等待进程池中的所有进程执行完毕
    print("Sub-process(es) done.")

    for res in results:
        print(res.get())

if __name__ == '__main__':
    start = time.time()
    executor = ProcessPoolExecutor(max_workers=3)
    # 使用submit方式
    for i in range(20):
        msg = "ProcessPoolExecutor process %d" % (i)
        future = executor.submit(work, msg)
        # print(future.done())
        # 加了.result()会阻塞主线程
        print(future.result())
    # 使用map方式
    # executor.map(load_url, URLS)
    # executor.shutdown() # 关闭进程池
    end = time.time()
    # print('主线程')
    print(end-start)
