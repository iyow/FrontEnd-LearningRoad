## Symbol

### 基础知识
- 概念
Symbol()函数会返回symbol类型的值

- 获取Symbole
    - getOwnPropertySymbols
    该方法能让你在查找一个给定对象的符号属性时返回一个symbol类型的数组。
    ```javascript
    Object.getOwnPropertySymbols([1, 2, 3].__proto__)
    Object.getOwnPropertySymbols(Object.getPrototypeOf([1, 2, 3]))
    ```
    - Symbol.for(key)
    - Symbol.keyFor(sym)

### Well-known symbols（大家都需要知道的一些 内建symbol）
- Symbol.iterator ([可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols))
    - 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。
    - 内置类型拥有默认的迭代器行为
        - Array.prototype\[@@iterator]()
        - TypedArray.prototype\[@@iterator]()
        - String.prototype\[@@iterator]()
        - Map.prototype\[@@iterator]()
        - Set.prototype\[@@iterator]()

- Symbol.asyncIterator
    - 指定了一个对象的默认AsyncIterator。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环。是一个用于访问对象的@@asyncIterator方法的内建符号。
    - 内置类型拥有默认行为
        - Streams
    > 目前没有默认设定了\[Symbol.asyncIterator]属性的JavaScript内建的对象。不过，WHATWG（网页超文本应用技术工作小组）Streams会被设定为第一批异步可迭代对象，\[Symbol.asyncIterator] 最近已在设计规范中落地。

- Symbol.match
    - 指定了匹配的是正则表达式而不是字符串。String.prototype.match() 方法会调用此函数。此函数还用于标识对象是否具有正则表达式的行为。
    - 以下方法会检查其第一个参数是否是正则表达式
        - String.prototype.startsWith()
        - String.prototype.endsWith()
        - String.prototype.includes()

- Symbol.replace
    - 指定了当一个字符串替换所匹配字符串时所调用的方法
    - 内置类型拥有该默认行为
        - RegExp.prototype[@@replace]()
        - String.prototype.replace()

- Symbol.search
    - 指定了一个搜索方法，这个方法接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标
    - 内置类型拥有该默认行为
        - RegExp.prototype[@@search]()
        - String.prototype.search()

- Symbol.split
    - 指定了一个正则表达式的索引处分割字符串的方法。
    - 内置类型拥有该默认行为
        - RegExp.prototype[@@split]()
        - String.prototype.split()

- Symbol.hasInstance
    - 用于判断某对象是否为某构造器的实例。(用它自定义 instanceof 操作符在某个类上的行为。)

- Symbol.isConcatSpreadable
    - 用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素

- Symbol.unscopables
    - 可以在任何对象上定义,用于排除属性名称并与 with 环境绑定在一起作为词法变量公开。

- Symbol.species
    - 它是作为对象的函数值属性存在的，该访问器属性允许子类覆盖对象的默认构造函数。

- Symbol.toPrimitive
    - 它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。

- Symbol.toStringTag
    - 它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。