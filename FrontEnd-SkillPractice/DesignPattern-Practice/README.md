# JavaScript设计模式

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
    
## 设计模式类型划分
### 行为型模式（BehavioralPatterns）：
- 策略模式（Strategy）
- 观察者模式（Observer）/订阅发布模式（Publish&Subscribe）
- 迭代器模式（Iterator）
- 命令模式（Command）
- 模板方法模式（Template Method）
### 创建型模式（CreativePatterns）：
- 单例模式（Signleton）
### 结构型模式（StructuralPatterns）：
- 组合模式（Composite）
- 代理模式（Proxy）
- 享元模式（FLYWEIGHT）