# 2018-07-16 日报

> Node 服务器端渲染

---

## 事宜

- [ ] vue专题页同构，node服务器端渲染

## 问题及解决

- 前端渲染整个页面的渲染基本上都由前端js动态渲染，但这样对于一些应用来说是有缺陷的。比如需要 SEO 的，需要打开页面不用等待就能看到页面的等，解决这个问题暂时有以下思路：
    - 预渲染：无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时(build time)简单地生成针对特定路由的静态 HTML 文件。
    - 服务器端渲染(SSR)：将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。（next.js,nuxt.js）
    - node中间层：保留服务器端模板渲染的功能，但是由 node 程序来代替以往的后端语言进行模板渲染，后端语言与 node 程序只做数据交互。
