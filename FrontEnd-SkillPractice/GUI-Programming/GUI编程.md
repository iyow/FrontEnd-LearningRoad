GUI 编程

UI
- CUI（Command User Interface，简称 CUI，又称命令行用户交互， CLI，Command line User Interface）
- GUI（Graphical User Interface，简称 GUI，又称图形用户接口）

## Q&A

- 我对windows下sdk编程有些了解，linux下最底层是否也是利用x-windows system提供的API进行GUI编程? 两者提供的API各有什么特点，哪个比较易于编程？另外，有哪些比较好的framework?(c++)
    - Windows桌面程序，界面和程序是源码级混合：Windows系统下的GUI程序，界面（GUI）与程序其他部分逻辑上是分离的，但是源码上直接交互，界面功能直接通过调用Win32 API来实现。
    例：CreateWindow()。
    写Windows桌面程序，必须调用GUI32.dll导出的API，无他可选。
    甚至线程模型很多功能都和GUI窗口绑定到了一起，如消息队列。
    - Linux程序，界面和程序是通过协议通信：
        - CUI程序和文本终端通过终端协议交互
        - GUI程序和XWindow Server通过X协议交互
Linux的GUI建立在X-WINDOWS的基础,这是与windows的GUI完全不同的一种架构windows的GUI是通过应用程序直接调用winows底层的GUI函数.或者说这是一种垂直的关系.而Linux的GUI是应用程序通过socket向X-WINDOW server发送请求实现的，只有X server在真正的写屏幕．或者说这是一种平行的关系．后者的方式带来更高的系统稳定性,因为图形显示系统崩溃，对于Linux来说，只不过是死掉一个进程而已，而对windows来说会导致整个系统的崩溃．当然X-window的开销要比windows的方式大，但是由于硬件的发展X-window在稳定性上的优点可能将会弥补速度上的差异。

1. X只是窗口模型，网络透明的窗口模型。只提供机制，不提供风格是X的原则。
2. X是客户服务器方式，功能远远超过Windows。
3. API差远了。一般没有人在X上直接编程，都会使用其上的工具包，比如Motif、 OpenLook、 Gtk等等。
4. 更详细的信息看 www.x.org 和 www.openmotif.org


- 学了很多理论，也做了不少命令行的小程序，可是却对 GUI 一无所知，也不知道背后的 function 如何和用户的图形界面进行关联。

主要把几个关键问题弄清楚，每个框架都有不同的方案解决这几个问题。
1. 怎么描述界面。一般都是类似xml的树结构来描述
2. 怎么render, refresh拿到object tree/render tree之后， 如何把这个东西画出来到framebuffer上， cpu？gpu？以什么格式？node的状态改变之后， 怎么刷新，什么时候刷新。
3. 如何管理这个tree。clip, transparent等等属性怎么处理, layout怎么管理，parent关掉了怎么处理子节点? ...
4. 用户点击这里该怎么办？(user event handling)无非这几种办法function pointer(Callback) 或者 signal/slot 或者observer interface＋ registration。
5. event handle (system event handling)这是比4更广义的问题， 
    a. input device trigged, 发IRQ， kernel处理， 丢给framework的handler.
    b. 打包放入 event queue.
    c. loop engine dispatches event: (key events sent to widget has the focus, mouse event to widget under cursor).
    d. if target dont have handler for this event, bubble up to the root node until someone accpet it.
6. MVC 的具体细节和jargon
7. 多线程， IPC， shared memory问题
8. audio, video的playback

很多GUI框架，比如：
windows下面：VB6.0,MFC,WTL,WinForm,WPF/Silverlight
跨平台：Qt/QML,PySide(PyQt),wxPython
网页相关:Flex,HTML+CSS
移动开发: WP(和Silverlight很像), Android.
其他: 公司内部使用的框架