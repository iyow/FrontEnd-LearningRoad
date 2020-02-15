# 管道pipe：管道是一种半双工的通信方式，数据只能单向流动，
# 而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系。

# 命名管道FIFO：有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。

# 消息队列MessageQueue：消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。
# 消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。

# 共享存储SharedMemory：共享内存就是映射一段能被其他进程所访问的内存，
# 这段共享内存由一个进程创建，但多个进程都可以访问。
# 共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。
# 它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。

# Queue和pipe只是实现了数据交互，并没实现数据共享，即一个进程去更改另一个进程的数据。
# 注：进程间通信应该尽量避免使用共享数据的方式

import time
from time import sleep
from multiprocessing import Process
import multiprocessing


# pipe
def foo(conn):
    conn.send('hello father')  # 向管道pipe发消息
    print(conn.recv())


if __name__ == '__main__':
    conn1, conn2 = multiprocessing.Pipe(True)  # 开辟两个口，都是能进能出，括号中如果False即单向通信
    p = multiprocessing.Process(
        target=foo, args=(conn1,))  # 子进程使用sock口，调用foo函数
    p.start()
    print(conn2.recv())  # 主进程使用conn口接收，从管道（Pipe）中读取消息
    conn2.send('hi son')  # 主进程使用conn口发送


# Queue
class MultiProcessProducer(multiprocessing.Process):
    def __init__(self, num, queue):
        """Constructor"""
        multiprocessing.Process.__init__(self)
        self.num = num
        self.queue = queue

    def run(self):
        t1 = time.time()
        print('producer start ' + str(self.num))
        for i in range(1000):
            self.queue.put((i, self.num))
        # print 'producer put', i, self.num
        t2 = time.time()

        print('producer exit ' + str(self.num))
        use_time = str(t2 - t1)
        print('producer ' + str(self.num) + ',use_time: ' + use_time)


class MultiProcessConsumer(multiprocessing.Process):
    def __init__(self, num, queue):
        """Constructor"""
        multiprocessing.Process.__init__(self)
        self.num = num
        self.queue = queue

    def run(self):
        t1 = time.time()
        print('consumer start ' + str(self.num))
        while True:
            d = self.queue.get()
            if d != None:
                # print 'consumer get', d, self.num
                continue
            else:
                break
        t2 = time.time()
        print('consumer exit ' + str(self.num))
        print('consumer ' + str(self.num) + ', use time:' + str(t2 - t1))


def main():
    # create queue
    queue = multiprocessing.Queue()

    # create processes
    producer = []
    for i in range(5):
        producer.append(MultiProcessProducer(i, queue))

    consumer = []
    for i in range(5):
        consumer.append(MultiProcessConsumer(i, queue))

    # start processes
    for i in range(len(producer)):
        producer[i].start()

    for i in range(len(consumer)):
        consumer[i].start()

    # wait for processs to exit
    for i in range(len(producer)):
        producer[i].join()

    for i in range(len(consumer)):
        queue.put(None)

    for i in range(len(consumer)):
        consumer[i].join()

    print('all done finish')


if __name__ == "__main__":
    main()
