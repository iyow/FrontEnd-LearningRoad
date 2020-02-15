# 线程间通信
import threading
import time
import queue


# 1.Queue
# 队列实现线程通信
# 三个队列类的简单介绍如下：
# ① queue.Queue(maxsize=0)：代表 FIFO（先进先出）的常规队列，maxsize 可以限制队列的大小。
# 如果队列的大小达到队列的上限，就会加锁，再次加入元素时就会被阻塞，直到队列中的元素被消费。
# 如果将 maxsize 设置为 0 或负数，则该队列的大小就是无限制的。
# ② queue.LifoQueue(maxsize=0)：代表 LIFO（后进先出）的队列，与 Queue 的区别就是出队列的顺序不同。
# ③ PriorityQueue(maxsize=0)：代表优先级队列，优先级最小的元素先出队列。
# 启动了三个消费者线程从 Queue 队列中取出元素。
# 本程序中 Queue 队列的大小为 1，因此三个生产者线程无法连续放入元素，
# 必须等待消费者线程取出一个元素后，其中的一个生产者线程才能放入一个元素。
def product(bq):
    str_tuple = ("Python", "Kotlin", "Swift")
    for i in range(99):
        print(threading.current_thread().name + "生产者准备生产元组元素！")
        time.sleep(1)
        # 尝试放入元素，如果队列已满，则线程被阻塞
        t = str_tuple[i % 3]
        bq.put(t)
        print(threading.current_thread().name
              + "生产者生产元组元素[ %s ]完成！" % t)


def consume(bq):
    while True:
        print(threading.current_thread().name + "消费者准备消费元组元素！")
        time.sleep(1)
        # 尝试取出元素，如果队列已空，则线程被阻塞
        t = bq.get()
        print(threading.current_thread().name
              + "消费者消费[ %s ]元素完成！" % t)


# # 创建一个容量为1的Queue
# bq = queue.Queue(maxsize=1)
# # 启动3个生产者线程
# threading.Thread(target=product, args=(bq, )).start()
# threading.Thread(target=product, args=(bq, )).start()
# threading.Thread(target=product, args=(bq, )).start()
# # 启动一个消费者线程
# threading.Thread(target=consume, args=(bq, )).start()


# 同步机制
# Semaphore（信号量）
# 限制同时能访问资源的数量为3
sema = threading.Semaphore(3)


def foo(tid):
    with sema:
        print('{} acquire sema'.format(tid))
        time.sleep(1)
    print('{} release sema'.format(tid))


threads = []

for i in range(5):
    t = threading.Thread(target=foo, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

    
# Lock（锁）&& RLock（可重入锁）


# Condition（条件变量）
# 使用 Condition 可以让那些己经得到 Lock 对象却无法继续执行的线程释放 Lock 对象，
# Condition 对象也可以唤醒其他处于等待状态的线程。
# 现在假设系统有一种特殊的要求，
# 即要求存款者和取钱者不断地重复存款、取钱的动作，
# 而且要求每当存款者将钱存入指定账户后，取钱者就立即取出该笔钱。
# 不允许存款者连续两次存钱，也不允许取钱者连续两次取钱。
class Account(object):
    # 定义构造器
    def __init__(self, account_no, balance):
        # 封装账户编号、账户余额的两个成员变量
        self.account_no = account_no
        self._balance = balance
        self.cond = threading.Condition()
        # 定义代表是否已经存钱的旗标
        self._flag = False
    # 因为账户余额不允许随便修改，所以只为self._balance提供getter方法

    def getBalance(self):
        return self._balance
    # 提供一个线程安全的draw()方法来完成取钱操作

    def draw(self, draw_amount):
        # 加锁,相当于调用Condition绑定的Lock的acquire()
        self.cond.acquire()
        try:
            # 如果self._flag为假，表明账户中还没有人存钱进去，取钱方法阻塞
            if not self._flag:
                self.cond.wait()
            else:
                # 执行取钱操作
                print(threading.current_thread().name
                      + " 取钱:" + str(draw_amount))
                self._balance -= draw_amount
                print("账户余额为：" + str(self._balance))
                # 将标识账户是否已有存款的旗标设为False
                self._flag = False
                # 唤醒其他线程
                self.cond.notify_all()
        except Exception:
            print('draw------抛出错误')
        # 使用finally块来释放锁
        finally:
            print('draw----always')
            self.cond.release()

    def deposit(self, deposit_amount):
        # 加锁,相当于调用Condition绑定的Lock的acquire()
        self.cond.acquire()
        try:
            # 如果self._flag为真，表明账户中已有人存钱进去，存钱方法阻塞
            if self._flag:            # ①
                self.cond.wait()
            else:
                # 执行存款操作
                print(threading.current_thread().name
                      + " 存款:" + str(deposit_amount))
                self._balance += deposit_amount
                print("账户余额为：" + str(self._balance))
                # 将表示账户是否已有存款的旗标设为True
                self._flag = True
                # 唤醒其他线程
                self.cond.notify_all()
        except Exception:
            print('deposit------抛出错误')
        # 使用finally块来释放锁
        finally:
            print('deposit----always')
            self.cond.release()


#  定义一个函数，模拟重复max次执行取钱操作
def draw_many(account, draw_amount, max):
    for i in range(max):
        account.draw(draw_amount)


#  定义一个函数，模拟重复max次执行存款操作
def deposit_many(account, deposit_amount, max):
    for i in range(max):
        account.deposit(deposit_amount)


# 创建一个账户
acct = Account("1234567", 0)
# 创建、并启动一个“取钱”线程
threading.Thread(name="取钱者", target=draw_many,
                 args=(acct, 800, 100)).start()
# 创建、并启动一个“存款”线程
threading.Thread(name="存款者甲", target=deposit_many,
                 args=(acct, 800, 100)).start()
threading.Thread(name="存款者乙", target=deposit_many,
                 args=(acct, 800, 100)).start()
threading.Thread(name="存款者丙", target=deposit_many,
                 args=(acct, 800, 100)).start()

# Event
# Event 实际上优点类似于 Condition 和旗标(flag)的结合体，
# 但 Event 本身并不带 Lock 对象，因此如果要实现线程同步，还需要额外的 Lock 对象。


class EventAccount:
    # 定义构造器
    def __init__(self, account_no, balance):
        # 封装账户编号、账户余额的两个成员变量
        self.account_no = account_no
        self._balance = balance
        self.lock = threading.Lock()
        self.event = threading.Event()
    # 因为账户余额不允许随便修改，所以只为self._balance提供getter方法

    def getBalance(self):
        return self._balance
    # 提供一个线程安全的draw()方法来完成取钱操作

    def draw(self, draw_amount):
        # 加锁
        self.lock.acquire()
        # 如果Event内部旗标为True，表明账户中已有人存钱进去
        if self.event.is_set():
            # 将Event内部旗标设为False
            self.event.clear()
            # 执行取钱操作
            print(threading.current_thread().name
                  + " 取钱:" + str(draw_amount))
            self._balance -= draw_amount
            print("账户余额为：" + str(self._balance))
            # 这行代码必须先执行否则会有问题---死锁？
            # self.event.clear()
            # 释放加锁
            self.lock.release()
            # 阻塞当前线程阻塞
            # self.event.wait()
        else:
            # 释放加锁
            self.lock.release()
            # 阻塞当前线程阻塞
            # self.event.wait()
        self.event.wait()

    def deposit(self, deposit_amount):
        # 加锁
        self.lock.acquire()
        # 如果Event内部旗标为False，表明账户中还没有人存钱进去
        if not self.event.is_set():
            # 将Event内部旗标设为True
            self.event.set()
            # 执行存款操作
            print(threading.current_thread().name
                  + " 存款:" + str(deposit_amount))
            self._balance += deposit_amount
            print("账户余额为：" + str(self._balance))
            # 这行代码必须先执行否则会有问题---死锁？
            # self.event.set()
            # 释放加锁
            self.lock.release()
            # 阻塞当前线程阻塞
            # self.event.wait()
        else:
            # 释放加锁
            self.lock.release()
            # 阻塞当前线程阻塞
            # self.event.wait()
        # 阻塞线程等待唤醒
        self.event.wait()

# 创建一个账户
acct = EventAccount("1234567", 0)
# 创建、并启动一个“取钱”线程
threading.Thread(name="Event取钱者", target=draw_many,
                 args=(acct, 800, 100)).start()
# 创建、并启动一个“存款”线程
threading.Thread(name="Event存款者甲", target=deposit_many,
                 args=(acct, 800, 100)).start()
threading.Thread(name="Event存款者乙", target=deposit_many,
                 args=(acct, 800, 100)).start()
threading.Thread(name="Event存款者丙", target=deposit_many,
                 args=(acct, 800, 100)).start()
