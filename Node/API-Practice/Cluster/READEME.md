
1. egg中为什么我的应用代码中明明有app.listen(port);，但cluster模块在多次fork这份代码时，却没有报端口已被占用？
- 端口仅由master进程中的内部TCP服务器监听了一次。
不会出现端口被重复监听报错，是由于，worker进程中，最后执行监听端口操作的方法，已被cluster模块主动hack。
2. egg中Master是如何将接收的请求传递至worker中进行处理然后响应的？
- 所有请求先同一经过内部TCP服务器。在内部TCP服务器的请求处理逻辑中，有负载均衡地挑选出一个worker进程，将其发送一个newconn内部消息，随消息发送客户端句柄。
Worker进程接收到此内部消息，根据客户端句柄创建net.Socket实例，执行具体业务逻辑，返回。


https://www.zhihu.com/question/265622067
https://github.com/xingyuzhe/blog/issues/1
https://github.com/xingyuzhe/blog/issues/8
https://cnodejs.org/topic/5b60495e58db3ccf66a450c6