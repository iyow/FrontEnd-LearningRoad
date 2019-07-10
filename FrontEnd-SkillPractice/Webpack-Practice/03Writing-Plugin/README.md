## 3. webpack Plugin编写
> plugin机制是webpack中另一个核心概念，它基于事件流框架tapable，你可以参考浏览器环境中的【DOM事件模型】，【SPA模型中的生命周期钩子】或是node环境中的【EventEmitter模块】来理解其作用。到webpack的官方网站浏览一下[Guide](https://webpack.js.org/contribute/writing-a-plugin/)和[loader的API](https://webpack.js.org/api/plugins/)

### webpack 插件由以下组成：

- 一个 JavaScript 命名函数。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。