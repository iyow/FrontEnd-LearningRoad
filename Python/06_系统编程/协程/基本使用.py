# futures 和 asyncio
# Futures,Asyncio并发编程

# python 进行并发编程
# ​ 在Python 2的时代，高性能的网络编程主要是使用Twisted、Tornado和Gevent(from greenlet)这三个库，但是它们的异步代码相互之间既不兼容也不能移植。

# ​ asyncio是Python 3.4版本引入的标准库，直接内置了对异步IO的支持。

# ​ asyncio的编程模型就是一个消息循环。我们从asyncio模块中直接获取一个EventLoop的引用，然后把需要执行的协程扔到EventLoop中执行，就实现了异步IO。

# ​ Python的在3.4中引入了协程的概念，可是这个还是以生成器对象为基础。

# ​ Python 3.5添加了async和await这两个关键字，分别用来替换asyncio.coroutine和yield from。

# ​ python3.5则确定了协程的语法。下面将简单介绍asyncio的使用。实现协程的不仅仅是asyncio，tornado和gevent， vloop都实现了类似的功能。


import re
import threading
import asyncio


@asyncio.coroutine
def hello1():
    print("Hello world!")
    # 异步调用asyncio.sleep(1)-->协程函数:
    r = yield from asyncio.sleep(1)  # 此处为另外一个协程，不是休眠
    print("Hello again!")


# 获取EventLoop（事件循环器）:
loop = asyncio.get_event_loop()
# 执行coroutine
loop.run_until_complete(hello1())
loop.close()

# @asyncio.coroutine把一个generator标记为coroutine类型，
# 然后，我们就把这个coroutine扔到EventLoop中执行。 hello()会首先打印出Hello world!，
# 然后，yield from语法可以让我们方便地调用另一个generator。
# 由于asyncio.sleep()也是一个coroutine，所以线程不会等待asyncio.sleep()，
# 而是直接中断并执行下一个消息循环。当asyncio.sleep()返回时，
# 线程就可以从yield from拿到返回值（此处是None），然后接着执行下一行语句。

# ​ 把asyncio.sleep(1)看成是一个耗时1秒的IO操作，
# 在此期间，主线程并未等待，而是去执行EventLoop中其他可以执行的coroutine了，
# 因此可以实现并发执行。


# 我们用Task封装两个coroutine试试：


@asyncio.coroutine
def hello2():
    print('Hello world! (%s)' % threading.currentThread())
    yield from asyncio.sleep(1)
    print('Hello again! (%s)' % threading.currentThread())


loop = asyncio.get_event_loop()
tasks = [hello2(), hello2()]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()


@asyncio.coroutine
def wget(host):
    print('wget %s...' % host)
    connect = asyncio.open_connection(host, 80)  # 等待打开host:80端口
    reader, writer = yield from connect  # 开始链接。如果连接成功，则返回Reader和写writer的操作对象
    header = 'GET / HTTP/1.0\r\nHost: %s\r\n\r\n' % host
    writer.write(header.encode('utf-8'))
    yield from writer.drain()
    while True:
        line = yield from reader.readline()
        if line == b'\r\n':
            break
        print('%s header > %s' % (host, line.decode('utf-8').rstrip()))
    # Ignore the body, close the socket
    writer.close()


loop = asyncio.get_event_loop()
tasks = [wget(host)
         for host in ['www.sina.com.cn', 'www.sohu.com', 'www.163.com']]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()



# 协程的语法糖 使用async/await

async def browser(host, port=80):
    # 连接host
    reader, writer = await asyncio.open_connection(host, port)
    print(host, port, '连接成功!')

    # 发起 / 主页请求(HTTP协议)
    # 发送请求头必须是两个空行
    index_get = 'GET {} HTTP/1.1\r\nHost:{}\r\n\r\n'.format('/', host)
    writer.write(index_get.encode())

    await writer.drain()  # 等待向连接写完数据（请求发送完成）

    # 开始读取响应的数据报头
    while True:
        line = await reader.readline()  # 等待读取响应数据
        if line == b'\r\n':
            break

        print(host, '<header>', line)

    # 读取响应的数据body
    body = await reader.read()
    # print(encoding)
    print(host, '<content>', body)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    tasks = [browser(host) for host in ['www.dushu.com',
                                        'www.sina.com.cn', 'www.baidu.com']]

    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()

    print('---over---')
