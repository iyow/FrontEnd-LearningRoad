/* 方法三 */
// document.execCommand
// 配合Selection对象 Range对象使用

// 注意  document.execCommand('cut'/'copy') 被拒绝，因为它不是从短时运行的用户生成的事件处理程序内部进行调用。
// 两点，短时运行  用户生成    只有通过用户实际操作才能触发execCommand，即使JS模拟点击也不可以。

// 拖蓝选中信息复制剪贴板
// document.addEventListener('mouseup', (e) => {
//     console.log(document.getSelection().toString())
//     document.execCommand('copy')
// })

// “托蓝”情况下点击复制
// 非”托蓝“情况下对于图片   高亮选中父节点下的所有节点复制
// 火狐复制后的图片为空白
document.addEventListener('click', (e) => {
    let selection = document.getSelection()
    if (e.target.nodeName === 'IMG') {
        selection.selectAllChildren(e.target.parentNode) // 如果是图片“托蓝”（高亮）选中该节点的父节点
    }
    console.log(document.execCommand('copy'))
    console.log(document.getSelection().toString())
})