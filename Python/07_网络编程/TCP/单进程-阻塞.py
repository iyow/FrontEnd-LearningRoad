import socket


serve_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 重复使用绑定的信息
serve_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)


