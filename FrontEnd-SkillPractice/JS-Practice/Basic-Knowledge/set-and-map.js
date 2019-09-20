// [*] --- X.prototype
// Set
// Set 数据结构类似于数组，但是成员的值都是唯一的，没有重复的值(判断两个值是否不同，使用的算法叫做“Same-value-zero equality”)。
// 初始化: Set构造函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// Set结构实例: 
    // 属性 Set.prototype.constructor，[*].size
    // 方法 [*].add(value)，[*].delete(value)，[*].has(value)，[*].clear()
    // 遍历操作 
        // Set.prototype[Symbol.iterator] === Set.prototype.values
        // [*].keys()，[*].values()，[*].entries()，[*].forEach()，

// WeakSet
// WeakSet 数据结构与 Set 类似，
// 区别: 
    // 区别一.WeakSet 的成员只能是对象，而不能是其他类型的值。
    // 区别二.
    // WeakSet 中的对象都是弱引用，
    // 即垃圾回收机制不考虑 WeakSet 对该对象的引用，
    // 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
    // 不考虑该对象还存在于 WeakSet 之中。
// 适用场景: 
    // 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
    // WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
// 初始化: 
    // WeakSet构造函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// WeakSet结构实例: 
    // 属性 WeakSet.prototype.constructor
    // 方法 [*].add(value)，[*].delete(value)，[*].has(value)
    // 遍历操作(不可遍历)
        // WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，
        // 运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，
        // 因此 ES6 规定 WeakSet 不可遍历。


// Map
// Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
    // Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
    // 如果键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
// 区别：
    // Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
// 初始化: Map构造函数接受任何一个具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构。(意味着Set和Map都可以用来生成新的 Map)
// Map结构实例: 
    // 属性 Map.prototype.constructor，[*].size
    // 方法 [*].set(key, value)，[*].get(key)，[*].has(key)，[*].delete(key)，[*].clear()
    // 遍历操作 
        // map[Symbol.iterator] === map.entries
        // [*].keys()，[*].values()，[*].entries()，[*].forEach()，


// WeakMap
// WeakMap 数据结构与 Map 类似，也是用于生成键值对的集合。
// 区别: 
    // 区别一.只接受对象作为键名（null除外），不接受其他类型的值作为键名。
    // 区别二.WeakMap的键名所指向的对象，不计入垃圾回收机制。
// 适用场景: 
    // 有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
    // 它的键名所引用的对象都是弱引用。一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失。
    // WeakMap 弱引用的只是键的名，而不是键的值。键值依然是正常引用。
    // 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
// 初始化: 
    // WeakSet构造函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// WeakSet结构实例: 
    // 属性 WeakSet.prototype.constructor
    // 方法 [*].add(value)，[*].delete(value)，[*].has(value)
    // 遍历操作(不可遍历)
        // 某个键名是否存在完全不可预测,跟垃圾回收机制是否运行相关。
        // 这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，
        // 为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，