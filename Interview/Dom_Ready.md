### DOM的加载与解析
- DOMLoading
浏览器开始解析dom树的时间点

- DOMInteractive
表示浏览器已经解析好dom树了。

- DOMContentLoaded
同步的JS已经执行完毕了。

### 涉及浏览器事件
- window.onload:
当页面全部加载完成（包括所有资源）
- document.onload:
当整个html文档加载的时候就触发了，也就是在body元素加载之前就开始执行了
- DOMContentLoaded:
当页面的DOM树解析好并且需要等待JS执行完才触发
- DOMContentLoaded事件不直接等待CSS文件、图片的加载完成
- onreytstatechange:
当对象状态变更时触发这个事件，一旦document的readyState属性发生变化就会触发
- JQ的domready 实现：
    1. 通过settimeout递归检测document的readyState属性
    2. 使用DOMContentLoaded
    3. 使用onreadytstatechange事件）