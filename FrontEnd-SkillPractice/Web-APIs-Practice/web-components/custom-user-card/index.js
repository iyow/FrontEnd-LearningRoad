// 创建一个类或函数来指定web组件的功能
// 1.函数方法
// customElements.define('user-card', UserCard, { extends: 'p' });
// customElements.define('user-card', UserCard, class extends HTMLElement{
//     constructor(){
//         super()
//     }
// });

// 2.类方法
class UserCard extends HTMLElement {
    constructor() {
        super()
        // this  表示自定义元素实例
        // let shadow = this
        // Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。
        // open 指定为开放的封装模式,Shadow DOM可以被外界访问。closed 指定为关闭的封装模式。
        let shadow = this.attachShadow({ mode: 'closed' })

        // 1.通过template创建
        let templateElem = document.getElementById('userCardTemplate');
        // 克隆了它的所有子元素，
        // 这是因为可能有多个自定义元素的实例，这个模板还要留给其他实例使用，所以不能直接移动它的子元素。
        let content = templateElem.content.cloneNode(true);
        // 自定义元素的参数  把参数加到自定义元素里面。


        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');

        shadow.appendChild(content);

        // 2.直接生成
        // generatorCustomInnerHTML(this)
    }
}
// 类和元素关联
// custom element 的名称不能是单个单词，且其中必须要有短横线。
// 自定义元素不能/不应该用作自闭合标记。
window.customElements.define('user-card', UserCard);


function generatorCustomInnerHTML(context) {
    var image = document.createElement('img');
    image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
    image.classList.add('image');

    var container = document.createElement('div');
    container.classList.add('container');

    var name = document.createElement('p');
    name.classList.add('name');
    name.innerText = 'User Name';

    var email = document.createElement('p');
    email.classList.add('email');
    email.innerText = 'yourmail@some-email.com';

    var button = document.createElement('button');
    button.classList.add('button');
    button.innerText = 'Follow';

    // 创建一些 CSS，并应用到 shadow dom上
    var style = document.createElement('style');

    style.textContent = '.wrapper {' +
        // 简洁起见，省略了具体的CSS

        // 将创建的元素附加到 shadow dom

        container.append(name, email, button);
    context.append(image, container);
}