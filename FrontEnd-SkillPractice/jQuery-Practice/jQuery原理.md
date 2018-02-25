## 1. 链式编程
+ 链式编程原理：
```
                return this;
```                
+ 通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 this

+ end(); //结束当前链最近的一次过滤操作，并且返回匹配元素之前的一次状态，返回到当前对象的方法链的上一个对象

## 2. 隐式迭代
+ 隐式迭代原理：
```
function Persion() {
        this.items = [];
        this.click = function (f) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].click = f;
            }
            this.click = f;
        };
    }
    var p1 = new Persion();
    var p2 = new Persion();
    var p = new Persion();
    p.items.push(p1);
    p.items.push(p2);
    p.click(function () {
        console.log("sss");
    });
```
+ 在方法的内部会对匹配到的所有元素进行循环遍历，执行相应的方法；无需我们再手动地进行循，方便我们使用。

+ 如果是获取多个元素的值，大部分情况下返回第一个元素的值。

## 3.多库共存
+ 模拟另外的库使用了 $ 这个变量名。此时，就与jQuery库产生了冲突  
```
var $ = { name : “ykp” };
```
+ 让jQuery释放对$的控制权，让其他库能够使用$。此后，只能用jQuery来调用jQuery提供的方法
```
var myjQuery = $.noConflict();
```

