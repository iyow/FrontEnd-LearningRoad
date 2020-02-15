import threading
import time


# 定义一个函数来模拟取钱操作
class Account:
    # 定义构造器
    def __init__(self, account_no, balance):
        # 封装账户编号、账户余额的两个成员变量
        self.account_no = account_no
        self.balance = balance


def draw(account, draw_amount):
    # 账户余额大于取钱数目
    if account.balance >= draw_amount:
        # 吐出钞票
        print(threading.current_thread().name
              + "取钱成功！吐出钞票:" + str(draw_amount))
        # time.sleep(0.001)
        # 修改余额
        account.balance -= draw_amount
        print("\t余额为: " + str(account.balance))
    else:
        print(threading.current_thread().name
              + "取钱失败！余额不足！")


# 创建一个账户
acct = Account("1234567", 1000)
# 模拟两个线程对同一个账户取钱
# 程序中有两个并发线程在修改 Account 对象
threading.Thread(name='甲', target=draw, args=(acct, 800)).start()
threading.Thread(name='乙', target=draw, args=(acct, 800)).start()

# 使用互斥锁同步线程
# 为了解决这个问题，Python 的 threading 模块引入了互斥锁（Lock）。
# threading 模块提供了 Lock 和 RLock 两个类
# Lock 和 RLock 的区别如下：
# threading.Lock：它是一个基本的锁对象，每次只能锁定一次，其余的锁请求，需等待锁释放后才能获取。
# threading.RLock：它代表可重入锁（Reentrant Lock）。
# 对于可重入锁，在同一个线程中可以对它进行多次锁定，也可以多次释放。
# 如果使用 RLock，那么 acquire() 和 release() 方法必须成对出现。
# 如果调用了 n 次 acquire() 加锁，则必须调用 n 次 release() 才能释放锁。


class LockAccount:
    # 定义构造器
    def __init__(self, account_no, balance):
        # 封装账户编号、账户余额的两个成员变量
        self.account_no = account_no
        self._balance = balance
        self.lock = threading.RLock()

    # 因为账户余额不允许随便修改，所以只为self._balance提供getter方法

    def getBalance(self):
        return self._balance

    # 提供一个线程安全的draw()方法来完成取钱操作

    def draw(self, draw_amount):
        # 加锁
        self.lock.acquire()
        try:
            # 账户余额大于取钱数目
            if self._balance >= draw_amount:
                # 吐出钞票
                print(threading.current_thread().name
                      + "取钱成功！吐出钞票:" + str(draw_amount))
                time.sleep(0.001)
                # 修改余额
                self._balance -= draw_amount
                print("\t余额为: " + str(self._balance))
            else:
                print(threading.current_thread().name
                      + "取钱失败！余额不足！")
        finally:
            # 修改完成，释放锁
            self.lock.release()


# 定义一个函数来模拟取钱操作
def lock_draw(account, draw_amount):
    # 直接调用account对象的draw()方法来执行取钱操作
    account.draw(draw_amount)

# 创建一个账户
acct = LockAccount("1234567", 1000)
# 模拟两个线程对同一个账户取钱
threading.Thread(name='甲甲', target=lock_draw, args=(acct, 800)).start()
threading.Thread(name='乙乙', target=lock_draw, args=(acct, 800)).start()

# 可变类的线程安全是以降低程序的运行效率作为代价的，为了减少线程安全所带来的负面影响，程序可以采用如下策略：
# 不要对线程安全类的所有方法都进行同步，只对那些会改变竞争资源（竞争资源也就是共享资源）的方法进行同步。
# 例如，上面 Account 类中的 account_no 实例变量就无须同步，所以程序只对 draw() 方法进行了同步控制。
# 如果可变类有两种运行环境，单线程环境和多线程环境，则应该为该可变类提供两种版本，
# 即线程不安全版本和线程安全版本。
# 在单线程环境中使用钱程不安全版本以保证性能，
# 在多线程环境中使用线程安全版本。
