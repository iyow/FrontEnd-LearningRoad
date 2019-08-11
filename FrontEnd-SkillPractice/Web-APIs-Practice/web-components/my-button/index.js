import template from './tpl-my-button.js'
class Button extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('.container');
        this.$button = this._shadowRoot.querySelector('button');

        // 如何将函数传递给Web组件进行交互？
        // 1.使用属性传递，但是传过来的是字符串
        // 2.内置事件交互
        // 3.使用自定义事件，外部在该dom节点下监听自定义事件
        this.$button.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent('onCustomClick', {
                    detail: 'Hello from within the Custom Element',
                })
            );
        });
    }

    // 拦截gettter 直接获取属性值
    get label() {
        console.log('my-button label------getter触发');

        return this.getAttribute('label');
    }

    set label(value) {
        console.log('my-button label------setter触发');

        // 通过js修改 property 无法触发 dom 的 attribute 改变
        // 所以拦截setter 手动设置dom的attribute
        // 进而触发生命周期attributeChangedCallback
        this.setAttribute('label', value);
    }

    // 生命周期
    // 使用attributeChangedCallback 以及 js属性(property)和dom属性(attribute)的getter setter实现响应
    static get observedAttributes() {
        console.log('my-button 生命周期属性监听------get触发');

        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log('my-button 生命周期属性监听------回调函数触发', name, oldVal, newVal);

        this.render();
    }
    connectedCallback() {
        // 原子设计原则
        if (this.hasAttribute('as-atom')) {
            this.updateAsAtom();
        }
    }
    updateAsAtom() {
        this.$container.style.padding = '0px';
    }

    render() {
        // 触发 label 的getter获取 值
        this.$button.innerHTML = this.label;
    }
}

window.customElements.define('my-button', Button);