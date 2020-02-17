import socket
import time

# 用来存储所有的新链接的socket
g_socketList = []
# 用来存储需要删除的客户端信息
g_needDelClientInfoList = []


def main():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    localAddr = ('', 8080)
    server_socket.bind(localAddr)
    # 可以适当修改listen中的值来看看不同的现象
    server_socket.listen(1000)
    # 将套接字设置为非堵塞
    # 设置为非堵塞后，如果accept时，恰巧没有客户端connect，那么accept会
    # 产生一个异常，所以需要try来进行处理
    server_socket.setblocking(False)


# 只是 将所有阻塞部分 都设置为非阻塞  然后每次循环都反复处理所有的连接状态并处理1024字节数据 然后进入下一次循环
# 后续修改为多路复用的模型对主进程进行阻塞监听，比较常用的有select模型和epoll模型。这两个都是系统接口，由操作系统提供。
    while True:

        # 用来测试
        print('main-----loop')
        time.sleep(0.5)

        try:
            # client_socket,addr = server_socket.accept()
            newClientInfo = server_socket.accept()
        except Exception as result:
            pass
        else:
            print("一个新的客户端到来:%s" % str(newClientInfo))
            newClientInfo[0].setblocking(False)
            g_socketList.append(newClientInfo)

        for clientSocket, clientAddr in g_socketList:
            try:
                recvData = clientSocket.recv(1024)
                if len(recvData) > 0:
                    print('recv[%s]:%s' % (str(clientAddr), recvData))
                else:
                    print('[%s]客户端已经关闭' % str(clientAddr))
                    clientSocket.close()
                    g_needDelClientInfoList.append((clientSocket, clientAddr))
            except Exception as result:
                pass

        for needDelClientInfo in g_needDelClientInfoList:
            g_socketList.remove(needDelClientInfo)


if __name__ == '__main__':
    main()
