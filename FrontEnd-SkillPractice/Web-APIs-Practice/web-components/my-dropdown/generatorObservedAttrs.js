// 属性重复编写getter setter 使用代理和动态属性统一处理
function getDescribe(attr) {
    let wrap = x => x
    switch (attr) {
        case 'label':
        case 'selectedopt':
            break;
        case 'options':
            wrap = x => typeof x === 'object' ? JSON.stringify(x) : JSON.parse(x)
            break;
    }

    let o = {
        get() {
            // console.dir(this);
            
            return this.hasAttribute(attr) ? wrap(this.getAttribute(attr)) : '';
        },
        set(value) {
            this.setAttribute(attr, wrap(value));
        }
    }

    return o
}
export default function generatorObservedAttrs(property, context) {
    property.forEach(attr => {
        Object.defineProperty(context, attr, getDescribe(attr))
    })
}