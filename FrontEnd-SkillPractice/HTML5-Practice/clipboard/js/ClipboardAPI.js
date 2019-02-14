/* 方法一 */
// navigator   Clipboard API   异步剪贴板
// 仅支持通过 HTTPS 提供的页面。为了防止滥用，只有当页面处于活动选项卡时才允许剪贴板访问。活动选项卡中的页面可以在不请求权限的情况下写入剪贴板，但从剪贴板中读取始终需要权限。
// （Permissions API）与使用权限 API 的任何其它内容一样，可以检查您的应用是否具有与剪贴板交互的权限：

// 谷歌 下可用
navigator.permissions.query({
    name: 'clipboard-read'
}).then(permissionStatus => {
    // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
    console.log(permissionStatus.state);

    // 监听权限状态改变事件
    permissionStatus.onchange = () => {
        console.log(permissionStatus.state);
    };
});
// 因为只有当页面是当前活动选项卡时，Chrome 才允许剪贴板访问，因此如果直接粘贴到 DevTools 中，则会发现这里的一些示例运行不正确，因为此时 DevTools 本身是活动选项卡（页面不是活动选项卡）。
// 有一个技巧：我们需要使用 setTimeout 推迟剪贴板访问，然后在调用函数之前快速单击页面内部以使页面获取焦点：

// setTimeout(async () => {
//     const text = await navigator.clipboard.readText();
//     console.log(text);
// }, 2000);