### 副作用
> 副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互，副作用中的“副”是滋生bug的温床。概括的来讲，只要是跟函数外部环境发生的交互就都是副作用，但是这并不是说要禁止使用一切的副作用，而是说，要让他们在可控的范围内发生。后续会使用functor和monad来学习如何控制他们。

### 纯函数
> 能根据相同的输入返回相同的输出

### 为什么要追求纯函数，理由？
- 可缓存性
- 可以移植性/自文裆化
- 可测试性
- 合理性，如果一段代码可以替换成它执行所得的结果，而且是在不改变整个程序行为的前提下替换的，那么我们就说这段代码是引用透明的，这样我们就可以使用一种叫做"等式推导"的技术来分析代码，等式推导带来的分析代码的能力对重构和理解代码非常重要。
- 并行代码

------------------------------------------------

### 一些帮助我们更方便地编写纯函数程序的工具与方法
- **柯里化(curry)**
> 概念：只传递给函数它一部分的参数来调用它，让他返回一个函数去处理剩下的参数，通过简单地传递几个参数，就能动态创建实用的新函数，且保留了数学的函数定义，尽管参数可能不止一个。

```javascript
// example
const curryAdd = function (x) {
    return function (y) {
        return x + y;
    };
};
curryAdd(1)(2)
let add1 = currAdd(1)
add1(2)
```

- Ramdajs ,JS函数式编程库，你可能会问，Underscore 和 Lodash （curryRight）已经这么流行了，为什么还要好像雷同的 Ramda ,回答是，前两者的参数位置不对，把处理的数据放到了第一个参数。Ramda 的数据一律放在最后一个参数，理念是"function first，data last",所有方法都支持柯里化。所有多参数的函数，默认都可以单参数使用。

- **代码组合(compose)**
> 概念：选择多个函数 让它们结合，产生一个新的函数，它们(各函数)之间相当于通过”管道“传输值。compose:函数从右向左执行，pipe:函数从左往右执行

```javascript
const composeFG = function (f,g) {
    return function (x) {
        // 从右向左数据流
        return f(g(x));
    };
};
let funcF = x => x.toUppercase();
let funcG = x => x + '!';
let composeFunction = composeFG(funcF,funcG)
composeFunction('some string')
```
    - 结合律

- **声明式代码**

- **pointfree模式**
> 函数无须提及将要操作的数据是什么样的。一等公民函数，柯里化，组合 ， 协作起来非常有助于实现此模式

```javascript
// origin
const snakeCase = function (word) {
    return word.toLowerCase().replace(/\s+/ig,'_');
}
// pointfree
// replace(/\s+/ig,'_')   toLowerCase  为柯里化后的函数
const snakeCase = compose(replace(/\s+/ig,'_'),toLowerCase)
```

- **debug**
```javascript
// 如果在debug的时候遇到困难
// 可以使用下面这个  实用 但是 不纯的trace函数来追踪
// 它允许我们在某个特定点观察数据以便debug
const trace = curry(function(tag,x){
    console.log(tag,x)
    return x
})

const dasherize = compose(join('_'),map(toLower),trace('after split'),splt(' '),replace(/\s{2,}/ig,' '))
```

> 组合将成为 我们构造程序的强大工具 ，并且它的背后是一套强大的理论做支撑。

------------------------------------------------

- **范畴学**
> 范畴学(category theory) 是数学中的一个抽象分支，能够形式化 诸如，集合论(set theory),类型论(type theory),群论(group theory)以及逻辑学(logic)等数学分支中的一些概念，范畴学要统一这些概念。范畴学主要处理对象(object),态射(morphism)和变化式(transformation)，而这些概念跟编程的联系非常紧密。
    - 对象的搜集：对象就是数据类型，通常我们把数据类型视作所有可能的值的一个集合
    - 态射的搜集：态射是标准的，普通的纯函数
    - 态射的组合：
    - identity独特的态射：

- **类型签名(Hindley-Milner)**
> 类型是让所有不同背景的人都能高效沟通的元语言，很大程度上，类型签名是以“Hindley-Milner”系统写就的。Hindley-Milner类型签名在函数式编程中无处不在，它们简单易读，写起来也不复杂。但仅仅凭签名就能理解整个程序还是有一定难度的。
    - 它能给我们带来什么？(作用)：
        - parametricity，缩小可能性范围，这允许我们利用类似 Hoogle这样的类型签名搜索引擎去搜索我们想要的函数，即帮助我们推断函数可能的实现。
        - “自由定理”(free theorems)
        - 类型约束，类型推断，编译时检测，文档

```javascript
// match :: Regex -> (String -> [String])
// match(reg)(str)   返回  string类型 数组
// 初看，match函数它接受一个Regex 和 一个 String 返回 一个 [String]
// 理解，match函数接受一个Regex作为参数  返回一个从 String 到 [String] 的函数
const match = curry(function (reg,s) {
    return s.match(reg)
})

// map :: (a -> b) -> [a] -> [b]
// map(f)(array)  返回  任意类型array
// 理解，
// map接受两个参数，
// 第一个数从任意类型 a 到(返回)任意类型 b 的函数；
// 第二个参数是一个数组 ，元素是任意类型的 a；
// map 最后返回的是 一个 类型 b 的数组
const map = curry(function (f,xs) {
    return xs.map(f)
})

// 把类型约束为 特定接口
// sort :: Ord a => [a] -> [a]
// 这个例子中 胖箭头 左边表明 a 一定是一个Ord对象，也就是说 a 必须要实现Ord接口
// assertEqual :: (Eq a, Show a) => a -> a -> Assertion
// 这个例子中 胖箭头 左边表明  有两个约束  Eq 和 Show。它们保证了我们可以检查不同的 a 是否相等
// 并且在不相等的情况下  打印出其中差异


```

> 至此 我们已经知道如何书写 函数式的 程序了，即通过 “管道” 把数据在一系列纯函数之间传递的程序。并且这些程序就是声明式的行为规范。**但是**，如何处理  控制流（control flow），异常处理（error handling），异步操作（asynchronous actions），状态（state）以及更加棘手的作用（effect）呢？

------------------------------------------------

- **容器**
- Container --- Identity ：
    1. 我们先创建一个容器，陈述规则如下
    - Container 是只有一个属性的对象。我们随意的把这个属性命名为__value
    - __value 不能是某个特定的类型
    - 数据一旦存放到 Container，就会一直存那儿
    ```javascript
    let Container = function (x) {
        this.__value = x
    }
    // 我们将使用Container.of作为构造器
    // 实际上我们不能简单地看待of函数
    // 暂时可以将它理解为把值放入容器的一种方式
    Container.of = function (x) {
        return new Container(x)
    }
    ```

    2. 第一个**functor**
    ```javascript
    // 一旦容器里有了值，我们就需要一种方法来让别的函数能够操作它

    // (a -> b) -> Container a -> Container b
    Container.prototype.map = function (f) {
        return Container.of(f(this.__value))
    }

    // 注意此处contact 及 _.prop('length')都是ramdajs中柯里化后的函数
    Container.of("bombs").map(contact(" away")).map(_.prop("length"))
    // => Container(10) => Container{__value:10}
    ```
    > 如果我们一直调用map，那它就是一个组合（composition）,这里面有什么数学magic在起作用呢？就是functor，它是实现了map函数并遵守一些特定规则的容器类型；它是范畴学里的概念。
> 这样的Container我们通常称它为 Identity，与id函数作用相同。接下来我们来定义另外一种functor，就是同样实现了map函数的类似容器的数据类型，该functor在调用map的时候能提供非常有用的行为。

- Container --- Maybe ：
    1. 创建容器并定义functor
    ```javascript
    let Maybe = function (x) {
        this.__value = x
    }
    Maybe.of = function (x) {
        return new Maybe(x)
    }

    Maybe.prototype.isNothing = function () {
        return (this.__value === null || this.__value === undefined)
    }
        
    Maybe.prototype.map = function (f) {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
    }

    Maybe.of(null).map(match(/a/ig))
    // => Maybe(null)
    Maybe.of({name:"Boris"}).map(_.prop("age")).map(add(10))
    // => Maybe(null)
    Maybe.of({name:"Dinah",age:14}).map(_.prop("age")).map(add(10))
    // => Maybe(24)
    ```
    > Maybe 和 Container看起来非常类似，但是有一点不同，Maybe会先检查自己的值是否为空（注意这个实现做了简化），然后才调用传进来的函数。

    2. 这种点记法(dot natation syntax)已经足够函数式了，但是我们更想保持一种pointfree的风格，map 完全有能力以curry函数的方式  来  ”代理“  任何functor
    ```javascript
    // map :: Functor f => (a -> b) -> f a -> f b
    // Functor f => ，这个标记告诉我们 f 必须是一个functor
    const map = curry(function (f, any_functor_at_all) {
        return any_functor_at_all.map(f)
    })

    // 这样我们就可以像平常一样使用组合，我们可以使用 点记发 在方便的时候使用 pointfree 模式也可以，就像下面这样

    // safeHead :: [a] -> Maybe(a)
    let safeHead = function (xs) {
        return Maybe.of(xs[0])
    }
    // pointfree模式   compose组合  从右向左
    let streetName = compose(map(_.props('street')), safeHead, _.props('addresses'))

    streetName({addresses: []})
    // Maybe(null)
    streetName({addresses: [{street:"Shady Ln.", number: 4201}]})
    // Maybe("Shady Ln.")
    ```

    3. 有时候我们 并不想要Maybe(null) 而是想返回一个自定义的值 然后能 继续执行后面的代码，这样我们需要借助一个帮助函数 maybe ：
    ```javascript
    // maybe :: b -> (a -> b) -> Maybe a -> b
    // 要么 返回一个静态值 x 与 f 的返回值类型一致
    // 要么 继续在没有 maybe 的情况下 继续执行
    const maybe = curry(function (x, f, m) {
        return m.isNothing ? x : f(m.__value)
    })

    let getStreetName = compose(
        maybe('sorry,no street,this is a default',map(_.props('street'))),
        safeHead,
        _.props('addressses')
    )
    getStreetName({addresses: []})
    // "sorry,no street,this is a default"
    ```

    4. 最后必须要提及的一点 ， 那就是 Maybe 的”真正“实现 会把它分为两种类型：一种是非控制空值，另一种是空值。这种实现允许我们遵守map的parametricity特性，因此 null 和 undefined 能够依然被 map 调用，functor里的值所需要的那种普遍性条件也能得到满足，所以，你经常看到  Some(x)/None  或者 Just(x)/Nothing 这样的容器类型在做空值检查，而不是Maybe。

- Container --- Either ：

- Container --- IO ：
> IO和之前的functor不同的地方在于，他的__value 总是一个函数，不过我们不把它当做一个函数  ，函数实现的细节我们不需要管，IO把非纯执行动作（impure action）捕获到包裹的函数里，目的是延迟执行这些非纯动作。就这一点，我们可以认为 IO 包含的是被包裹的 执行动作的 返回值，而不是包裹函数本身。