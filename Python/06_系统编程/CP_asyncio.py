# 使用多线程和普通的单线程相比，其运行效率会有极大的提高。但不得不说，多线程虽然有诸多优势，也存在一定的局限性：
# 多线程运行过程中容易被打断，还可能出现多个线程同时竞争同一资源的情况；
# 多线程切换本身存在一定的损耗，线程数不能无线增加，因此如果I\O操作非常频繁，多线程很有可能满足不了高效率、高质量的需求。

# 为了解决这些问题，Asyncio 并发编程(异步并发编程)应运而生

# 同步与异步
# 所谓同步，是指操作一个接一个地执行，下一个操作必须等上一个操作执行完成之后才能开始执行；
# 而异步是指不同操作间可以相互交替执行，如果其中地某个操作被堵塞，程序并不会等待，而是会找出可执行的操作继续执行。

# Asyncio 和其他 Python 程序一样，是单线程的，
# 它只有一个主线程，但可以进行多个不同的任务。
# 这里的任务，指的就是特殊的 future 对象，我们可以把它类比成多线程版本里的多个线程。

# 这些不同的任务，被一个叫做事件循环（Event Loop）的对象所控制。
# 所谓事件循环，是指主线程每次将执行序列中的任务清空后，就去事件队列中检查是否有等待执行的任务，
# 如果有则每次取出一个推到执行序列中执行，这个过程是循环往复的。

# 为了简化讲解这个问题，可以假设任务只有两个状态：，
# 分别是预备状态和等待状态：
# 预备状态是指任务目前空闲，但随时待命准备运行；
# 等待状态是指任务已经运行，但正在等待外部的操作完成，比如 I/O 操作。

# 在这种情况下，事件循环会维护两个任务列表，
# 分别对应这两种状态，
# 并且选取预备状态的一个任务（具体选取哪个任务，和其等待的时间长短、占用的资源等等相关）使其运行，
# 一直到这个任务把控制权交还给事件循环为止。
# 当任务把控制权交还给事件循环对象时，
# 它会根据其是否完成把任务放到预备或等待状态的列表，
# 然后遍历等待状态列表的任务，
# 查看他们是否完成：
# 如果完成，则将其放到预备状态的列表；
# 反之，则继续放在等待状态的列表。
# 而原先在预备状态列表的任务位置仍旧不变，因为它们还未运行。
# 这样，当所有任务被重新放置在合适的列表后，新一轮的循环又开始了，
# 事件循环对象继续从预备状态的列表中选取一个任务使其执行…如此周而复始，直到所有任务完成。
# 值得一提的是，对于 Asyncio 来说，
# 它的任务在运行时不会被外部的一些因素打断，
# 因此 Asyncio 内的操作不会出现竞争资源（多个线程同时使用同一资源）的情况，
# 也就不需要担心线程安全的问题了。


# 第三方协程 库Tornado，Gevent，官方asyncio
import asyncio
import aiohttp
import time


async def download_one(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            print('Read {} from {}'.format(resp.content_length, url))


async def download_all(sites):
    # 对输入的协程 download_one(site) 创建一个任务(async 函数)
    # asyncio.create_task(coro) 等效替代 asyncio.ensure_future(coro)
    tasks = [asyncio.create_task(download_one(site)) for site in sites]
    await asyncio.gather(*tasks)


def main():
    sites = [
        'http://c.biancheng.net',
        'http://c.biancheng.net/c',
        'http://c.biancheng.net/python'
    ]
    start_time = time.perf_counter()

    # loop = asyncio.get_event_loop()
    # try:
    #     loop.run_until_complete(download_all(sites))
    # finally:
    #     loop.close()
    asyncio.run(download_all(sites))

    end_time = time.perf_counter()
    print('Download {} sites in {} seconds'.format(
        len(sites), end_time - start_time))


if __name__ == '__main__':
    main()

# 实际工作中，想用好 Asyncio，特别是发挥其强大的功能，
# 很多情况下必须得有相应的 Python 库支持。
# 前面章节在学习多线程编程中使用的是 requests 库，
# 但本节使用的是 aiohttp 库，原因在于 requests 库并不兼容 Asyncio，
# 而 aiohttp 库兼容。Asyncio 软件库的兼容性问题，
# 在 Python3 的早期一直是个大问题，但是随着技术的发展，这个问题正逐步得到解决。

# 另外，使用 Asyncio 时，因为在任务调度方面有了更大的自主权，写代码时就得更加注意，不然很容易出错。
