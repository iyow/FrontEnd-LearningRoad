import socket
import random
import time

serverIp = input("请输入服务器的ip:")
connNum = input("请输入要链接服务器的次数(例如1000):")
g_socketList = []
for i in range(int(connNum)):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((serverIp, 7788))
    g_socketList.append(s)
    print(i)

while True:
    for s in g_socketList:
        s.send(str(random.randint(0, 100)))

    # 用来测试用
    # time.sleep(1)
