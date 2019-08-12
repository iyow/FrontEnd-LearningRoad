import template from './tpl-my-dropdown.js'
import generatorObservedAttrs from './generatorObservedAttrs.js'

class Dropdown extends HTMLElement {
    static observedAttrs = ['label', 'selectedopt', 'options']
    constructor() {
        super();
        console.log('------------------------------------');

        this.open = false;

        this._sR = this.attachShadow({ mode: 'open' });
        this._sR.appendChild(template.content.cloneNode(true));

        this.$label = this._sR.querySelector('.label');
        this.$button = this._sR.querySelector('my-button');
        this.$dropdown = this._sR.querySelector('.dropdown');
        this.$dropdownList = this._sR.querySelector('.dropdown-list');

        this.$button.addEventListener(
            'onCustomClick',
            this.toggleOpen.bind(this)
        );
    }
    // get label() {
    //     return this.getAttribute('label');
    // }

    // set label(value) {
    //     this.setAttribute('label', value);
    // }

    // get selectedopt() {
    //     // console.log('--------------------------', this);
    //     return this.getAttribute('selectedopt');
    // }

    // set selectedopt(value) {
    //     this.setAttribute('selectedopt', value);
    // }

    // get options() {
    //     return JSON.parse(this.getAttribute('options'));
    // }

    // set options(value) {
    //     this.setAttribute('options', JSON.stringify(value));
    // }

    static get observedAttributes() {
        return Dropdown.observedAttrs;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log('dom attribute 修改--------------------------------', name, oldVal, newVal);

        this.render();
    }

    // 控制下拉菜单的显示隐藏
    toggleOpen(event) {
        this.open = !this.open;

        this.open ? this.$dropdown.classList.add('open') : this.$dropdown.classList.remove('open');
    }
    render() {
        this.$label.innerHTML = this.label;

        if (this.options) {
            // this.$button.setAttribute(
            //     'label',
            //     this.options[this.selectedopt].label
            // );
            this.$button.label = this.options[this.selectedopt].label
        }

        this.$dropdownList.innerHTML = '';

        Object.keys(this.options || {}).forEach(key => {
            let option = this.options[key];
            let $newOptions = document.createElement('li');

            $newOptions.innerHTML = option.label;
            $newOptions.classList.add('basic-atom');

            if (this.selectedopt && this.selectedopt === key) {
                $newOptions.classList.add('selected');
            }

            $newOptions.addEventListener('click', () => {
                this.selectedopt = key;

                this.toggleOpen();

                this.dispatchEvent(
                    new CustomEvent('onChange', { detail: key })
                );

                this.render();
            });

            this.$dropdownList.appendChild($newOptions);
        });
    }
}
// 统一设置property的getter和setter  通过defineProperty 
// 详细参看/JS-Practice/ES6/class/mixin_multiple_extends理解
generatorObservedAttrs(Dropdown.observedAttrs, Dropdown.prototype)
// 或者通过Proxy实现
// class Dropdown extends HTMLElement {
//     constructor() {
//         super();
//         // ... ... 
//         return new Proxy(this, {
//             // ... ... 
//         })
//     }
// }

window.customElements.define('my-dropdown', Dropdown);