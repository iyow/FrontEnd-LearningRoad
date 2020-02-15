# _thread，此模块仅提供了低级别的、原始的线程支持，以及一个简单的锁。
# threading，提供了功能丰富的多线程支持。
# Python 主要通过两种方式来创建线程：
# 使用 threading 模块中 Thread 类的构造器创建线程。
# 即直接对类 threading.Thread 进行实例化，并调用实例化对象的 start 方法创建线程。
# 继承 threading 模块中的 Thread 类创建线程类。
# 即用 threading.Thread 派生出一个新的子类，将新建类实例化，并调用其 start 方法创建线程。


from concurrent.futures import ThreadPoolExecutor
import time
import threading


# # 定义一个普通的action函数，该函数准备作为线程执行体
def action(max):
    for i in range(max):
        # time.sleep(1)
        # 调用threading模块current_thread()函数获取当前线程
        # 线程对象的getName()方法获取当前线程的名字
        print(threading.current_thread().getName() + " " + str(i))


# 下面是主程序（也就是主线程的执行体）
for i in range(10):
    # 调用threading模块current_thread()函数获取当前线程
    print(threading.current_thread().getName() + " " + str(i))
    if i == 2:
        # 创建并启动第一个线程
        # daemon=True 将该线程设置为守护线程(后台线程)
        t1 = threading.Thread(target=action, args=(10,))
        t1.start()
        # 创建并启动第二个线程
        t2 = threading.Thread(target=action, args=(10,))
        t2.start()
        # t1.join()
        # t2.join()
        # time.sleep(1)

print('主线程执行完成!')


# 继承 Thread 类创建线程类

# 继承父类threading.Thread
class myThread(threading.Thread):
    def __init__(self, name, counter):
        threading.Thread.__init__(self)
        self.name = name
        self.counter = counter

    # 把要执行的代码写到run函数里面 线程在创建后会直接运行run函数
    def run(self):
        # 获得锁，成功获得锁定后返回True
        # threadLock.acquire()
        print("Starting " + self.name)
        print_time(self.name, self.counter, 5)
        print("Exiting " + self.name)
        # 释放锁
        # threadLock.release()


def print_time(threadName, delay, counter):
    while counter:
        # time.sleep(delay)
        print("%s process at: %s" % (threadName, time.time()))
        counter -= 1


# 线程锁，锁机制---线程同步
threadLock = threading.Lock()
# 创建新线程
# 处于新建状态
thread1 = myThread("Thread-1", 2)
thread2 = myThread("Thread-2", 2)

# 开启线程
# 处于就绪状态
# 处于这种状态中的线程并没有开始运行，只是表示该线程可以运行了。
# 至于该线程何时开始运行，取决于 Python 解释器中线程调度器的调度。
# 启动线程使用 start() 方法，而不是 run() 方法。
# 调用 start() 方法来启动线程，系统会把该 run() 方法当成线程执行体来处理；
# 如果直接调用线程对象的 run() 方法，则系统会把线程对象当成一个普通对象，
# 而 run() 方法是一个普通方法，不是线程执行体。
thread1.start()
thread2.start()
# 如果处于就绪状态的线程获得了 CPU，开始执行 run() 方法的线程执行体，则该线程处于运行状态。

# 等待线程结束
# thread1.join()
# thread2.join()

print("Exiting Main Thread")


# 线程池的使用

# 定义一个准备作为线程任务的函数


def tpe_action(max):
    my_sum = 0
    for i in range(max):
        print(threading.current_thread().name + '  ' + str(i))
        my_sum += i
    return my_sum


# 创建一个包含4条线程的线程池
with ThreadPoolExecutor(max_workers=4) as pool:
    # submit 任务
    # # 向线程池提交一个task, 50会作为tpe_action()函数的参数
    # future1 = pool.submit(tpe_action, 50)
    # def get_result(future):
    #     print(future.result())
    # # 为future1添加线程完成的回调函数
    # future1.add_done_callback(get_result)

    # 使用线程执行map计算
    # 后面元组有3个元素，因此程序启动3条线程来执行tpe_action函数
    results = pool.map(tpe_action, (50, 100, 150))
    print('--------------')
    for r in results:
        print(r)


# 线程局部变量（Thread Local Variable）
# 功用其实非常简单，就是为每一个使用该变量的线程都提供一个变量的副本，
# 使每一个线程都可以独立地改变自己的副本，而不会和其他线程的副本冲突。

# 定义线程局部变量
mydata = threading.local()


# 定义准备作为线程执行体使用的函数
def tlocal_action(max):
    for i in range(max):
        try:
            mydata.x += i
        except:
            mydata.x = i
        # 访问mydata的x的值
        print('%s mydata.x的值为: %d' %
              (threading.current_thread().name, mydata.x))


# 使用线程池启动两个子线程
with ThreadPoolExecutor(max_workers=2) as pool:
    pool.submit(tlocal_action, 10)
    pool.submit(tlocal_action, 10)


# 使用场景---
# 线程局部变量和其他同步机制一样，都是为了解决多线程中对共享资源的访问冲突的。
# 在普通的同步机制中，是通过为对象加锁来实现多个线程对共享资源的安全访问的。
# 由于共享资源是多个线程共享的，所以要使用这种同步机制，
# 就需要很细致地分析
# 什么时候对共享资源进行读写，什么时候需要锁定该资源，什么时候释放对该资源的锁定等。
# 在这种情况下，系统并没有将这份资源复制多份，只是采用安全机制来控制对这份资源的的访问而已。
# 线程局部变量从另一个角度来解决多线程的并发访问问题。
# 线程局部变量将需要并发访问的资源复制多份，
# 每个线程都拥有自己的资源副本，从而也就没有必要对该资源进行同步了。
# 线程局部变量提供了线程安全的共享对象，在编写多线程代码时，
# 可以把不安全的整个变量放到线程局部变量中，
# 或者把该对象中与线程相关的状态放入线程局部变量中保存。
# 线程局部变量并不能替代同步机制，两者面向的问题领域不同。
# 同步机制是为了同步多个线程对共享资源的并发访问，是多个线程之间进行通信的有效方式；
# 而线程局部变量是为了隔离多个线程的数据共享，从根本上避免多个钱程之间对共享资源（变量）的竞争，
# 也就不需要对多个线程进行同步了。
# 通常建议，如果多个线程之间需要共享资源，以实现线程通信，则使用同步机制；
# 如果仅仅需要隔离多个线程之间的共享冲突，则可以使用线程局部变量。


