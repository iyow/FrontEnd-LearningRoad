### Web Components
> Web Components 允许你创建可重用的定制元素（它们的功能封装在你的代码之外）并且在你的web应用中使用它们。

#### 主要技术
- Custom elements（自定义元素）
    - 分类：
        - Customized built-in elements 继承自基本的HTML元素。使用时，需要先写出基本的元素标签，并通过 is 属性指定custom element的名称。
        - Autonomous custom elements 是独立的元素，它不继承其他内建的HTML元素。使用时，直接把它们写成HTML标签的形式，来在页面上使用。
- Shadow DOM（影子DOM）
- HTML templates（HTML模板）

#### 实现基本方法
1. 创建一个类或函数来指定web组件的功能，如果使用类，请使用 ECMAScript 2015 的类语法
2. 使用 CustomElementRegistry.define() 方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。
3. 如果需要的话，使用Element.attachShadow() 方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
4. 如果需要的话，使用 \<template> 和 \<slot> 定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中。
5. 在页面任何您喜欢的位置使用自定义元素，就像使用常规HTML元素那样。

#### 生命周期
> 定义在自定义元素的类定义中的特殊回调函数，影响其行为
- connectedCallback: 当自定义元素第一次被连接到文档DOM时被调用。
- disconnectedCallback: 当自定义元素与文档DOM断开连接时被调用。
- adoptedCallback: 当自定义元素被移动到新文档时被调用。
- attributeChangedCallback: 当自定义元素的一个属性被增加、移除或更改时被调用。
    - observedAttributes: 如果需要在元素属性变化后，触发 attributeChangedCallback()回调函数，你必须监听这个属性。这可以通过定义observedAttributes() get函数来实现，observedAttributes()函数体内包含一个 return语句，返回一个数组，包含了需要监听的属性名称。