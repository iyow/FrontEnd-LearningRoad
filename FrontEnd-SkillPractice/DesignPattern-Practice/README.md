# JavaScript设计模式

> 一方面，我们受设计原则的指导，另一方面，我们未必要在任何时候都一成不变地遵守原则。

> 在方便性设计与稳定性设计之间要有一些取舍。具体是选择方便性还是稳定性，并没有标准答案，而是要取决于具体的应用环境。

> 设计模式就是给做的好的设计取个名字。

## 基础知识点
- 在JavaScript中一切都是对象，而且所有对象都是易变的（除了原始数据类型，但是即便是原始数据类型在必要的时候也会被自动包装为对象，例如，var str = 'hello world'，等号左边，我们称之为变量，等号右边，我们称之为值，值的类型，是字符串（值除了叫值，还可以称为：字面量。），所以‘hello world’只是一个表面字符串，当他使用‘.’符号引用toUpperCase()函数的时候，他已经不是字符串了，JavaScript会调用new String(str)把他变成了一个对象，这个对象继承了字符串的方法和属性）。
- 与对象的易变性相关的还有内省的概念（introspection），你可以在运行时检查对象所具有的的属性和方法，还可以使用这种信息动态实例化类和执行其方法（这种技术称为反射），JS在模仿传统的面向对象特性时，大多都依赖于对象的易变性和反射。
- new操作符原理
    ```JavaScript
    function New(F){
    var obj = {'__proto__': F.prototype};  /*第一步*/
    return function() {
        F.apply(obj, arguments);           /*第二步*/
        return obj;                        /*第三步*/
        }
    }
    ```
## 面向对象程序设计基本原则

### 单一职责原则（Single Responsibility Principle，SRP）
- 体现为：一个对象（方法）只做一件事情。
- 被定义为“引起变化的原因”。如果我们有两个动机去改写一
个方法，那么这个方法就具有两个职责。每个职责都是变化的一个轴线，如果一个方法承担了过
多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。
- SRP 原则的应用难点就是如何去分离职责,并不是所有的职责都应该一一分离。如果随着需求的变化，有两个职责总是同时变化，那就不必分离他们。

### 最少知识原则（Least Knowledge Principle，LKP.）
- 迪米特法则（Law of Demeter，LoD）
- 一个软件实体应当尽可能少地与其他实体发生相互作用。这里的软件实体是一个广义的概念，不仅包括对象，还包括系统、类、模块、函数、变量等。
- 如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系。常见的做法是引入一个第三者对象，来承担这些对象之间的通信作用。如果一些对象需要向另一些对象发起请求，可以通过第三者对象来转发这些请求。

### 开放封闭原则（Open Closure Principle，OCP）
- 软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。

## 设计模式分类

### 行为型模式（BehavioralPatterns）：
- 策略模式（Strategy）
- 观察者模式（Observer）/订阅发布模式（Publish&Subscribe）
- 迭代器模式（Iterator）
- 命令模式（Command）
- 模板方法模式（Template Method）
- 责任链模式（Chain of Responsibility）
- 中介模式（Mediator）
- 备忘录模式（Memento）
- 访问者模式（Visitor）
- 解析器模式（Interpreter）
- 状态模式（State）

### 创建型模式（CreativePatterns）：
- 单例模式（Signleton）

### 结构型模式（StructuralPatterns）：
- 组合模式（Composite）
- 代理模式（Proxy）
- 享元模式（FLYWEIGHT）
- 桥接模式（Bridge）
- 装饰模式（Decorator）
- 适配器模式（Adapter）
- 外观模式（Facade）
- 沙盒模式 （Sandbox）