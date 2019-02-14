/* 方法二 */
// IE 支持使用 window.clipboardData 访问系统剪贴板
// ClipboardEvent.clipboardData 属性保存了一个 DataTransfer 对象，这个对象可用于：
// 描述哪些数据可以由 cut 和 copy 事件处理器放入剪切板，通常通过调用 DataTransfer对象 的 setData(format, data) 方法；
// 获取由 paste 事件处理器拷贝进剪切板的数据，通常通过调用 DataTransfer对象 的 getData(format) 方法
// 页面复制剪切(copy,cut)---》对应setdata方法与剪贴板交互 页面内(paste) 粘贴---》对应getdata方法与剪贴板交互
console.log(window.clipboardData)
document.addEventListener('copy', (e) => {
    // 别忘了阻止默认事件
    e.preventDefault(); // 相当于你不能从body上拷贝内容了
    let myInfo = document.getSelection().toString()

    console.log(e.clipboardData) // DataTransfer对象
    let COPY = e.clipboardData.getData('text/plain'); //永远为空 复制无法获取系统剪贴板内容
    console.log(COPY)
    e.clipboardData.setData('text', myInfo+'©️自定义版权标识')
    console.log(e.clipboardData.getData('text/plain'))
})
document.addEventListener('paste', (e) => {
    e.preventDefault(); // 这里相当于不会粘贴内容到光标处了

    console.log(e.clipboardData) // DataTransfer对象


    let COPY = e.clipboardData.getData('text/plain'); //粘贴可以获取用户选中复制的数据
    console.log(COPY)
    e.clipboardData.setData('text', '©️自定义版权标识') // 无效 粘贴无法修该剪贴板内容
    console.log(e.clipboardData.getData('text/plain'))
})
/* 总结以下几点， 在chrome下：
1、 oncopy事件，你在callback函数里面是获取不到复制的内容的，因为是复制的动作还没有去做。
2、 oncopy事件，加了e.preventDefault()，阻止默认行为之后，复制的动作就不会做了。
3、 oncopy事件，在这里是可以修改剪贴板的值的，但是并没有卵用，因为这个时候剪贴板的值不是你希望的值。触发这个事件的时候获得的内容总是空字符串。

4、 onpaste事件，你在callback内容可以获取剪贴板的内容
5、 onpaste事件，but，你是不能修改剪贴板内容的。
6、 onpaste事件，你同样可以通过e.preventDefault()去阻止剪贴板的默认动作。

PS： 反正浏览器的权限是很小的，剪贴板的热点内容更改也不会让你乱动
那么你可以做什么？

1、你可以防止用户复制你页面的内容，你可以定制你想让用户复制的内容，定制的并不是剪贴板系统默认拷贝的，仅仅是你自己给的内容。（阻止拷贝 (由于复制时无法获取可修改系统剪贴板内容)再通过另两个方法修改系统剪贴板内容
完成定制内容复制）
1、你可以防止用户粘贴内容到你的页面，你可以定制你想让用户粘贴内容，定制的并不是剪贴板系统默认内容，仅仅是你自己给的内容。（阻止粘贴，(由于粘贴时可获取无法修改系统剪贴板内容)再通过其他方法修改剪贴板数据 插入页面完成定制粘贴）
*/