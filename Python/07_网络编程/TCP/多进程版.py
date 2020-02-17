import socket
import multiprocessing
from time import sleep


# 处理客户端的请求并为其服务
def dealWithClient(newSocket, destAddr):
    while True:
        recvData = newSocket.recv(1024)
        if len(recvData) > 0:
            print('recv[%s]:%s' % (str(destAddr), recvData))
        else:
            print('[%s]客户端已经关闭' % str(destAddr))
            break

    newSocket.close()


def main():

    serSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    localAddr = ('', 7788)
    serSocket.bind(localAddr)
    serSocket.listen(5)

    try:
        while True:
            print('-----主进程，，等待新客户端的到来------')
            # 主进程任然阻塞  只是每次连接都新建一个进程  进行处理
            newSocket, destAddr = serSocket.accept()

            print('-----主进程，，接下来创建一个新的进程负责数据处理[%s]-----' % str(destAddr))
            client = multiprocessing.Process(target=dealWithClient, args=(newSocket, destAddr))
            client.start()

            # 多进程版本 主进程中可关闭 client 的 连接
            # 因为已经向子进程中copy了一份（引用），并且父进程中这个套接字也没有用处了 所以关闭
            newSocket.close()
    finally:
        # 当为所有的客户端服务完之后再进行关闭，表示不再接收新的客户端的链接
        serSocket.close()


if __name__ == '__main__':
    main()
