// 限制输入包括输入法
export default limitKeyBoard = function (target) {

    target.addEventListener('keydown', () => {
        // 阻止默认 事件 输入
        e.preventDefault()
        // 阻止系统输入法
        // [16,229].includes(+e.keyCode)  还存在按住shitf可以输入所以16shiftkey也触发锁定
        if ([16,229].includes(+e.keyCode)) {
            // 延时 可以 加长一点500  防止有些输入法可以捡漏插入
            // 可编辑元素可是设置contentEditable属性锁定输入框
            // target.contentEditable = false
            // 或者触发失焦
            target.blur()
            setTimeout(() => {
                // target.contentEditable = true
                target.focus()
            }, 0)
        }
    })
}