import threading
import time
# 实现更复杂的任务调度
import sched

# 定时器 调度（回调）
# 定义总共输出几次的计数器
count = 0


def tt_print_time():
    print("当前时间：%s" % time.ctime())
    global t, count
    count += 1
    # 如果count小于10，开始下一次调度
    if count < 10:
        t = threading.Timer(1, tt_print_time)
        t.start()


# 指定1秒后执行print_time函数
t = threading.Timer(1, tt_print_time)
t.start()
# 取消 Timer 的调度
# t.cancle()


# 定义线程调度器
s = sched.scheduler()


# 定义被调度的函数
def print_time(name='default'):
    print("%s 的时间: %s" % (name, time.ctime()))


print('主线程：', time.ctime())
# scheduler.enterabs  在某个时间点触发执行
# 指定10秒之后执行print_time函数
s.enter(10, 1, print_time)
# 指定5秒之后执行print_time函数，优先级为2
s.enter(5, 2, print_time, argument=('位置参数',))
# 指定5秒之后执行print_time函数，优先级为1
s.enter(5, 1, print_time, kwargs={'name': '关键字参数'})
# 执行调度的任务
s.run()
print('主线程：', time.ctime())
