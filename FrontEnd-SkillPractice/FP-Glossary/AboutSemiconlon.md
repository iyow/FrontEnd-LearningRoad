# JS自动分号插入机制
 > 简介：JavaScript有着自动分号插入的机制(Automatic Semicolon Insertion)，简称ASI。这是一个辅助性的功能。[具体规则规范](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-rules-of-automatic-semicolon-insertion)。

 - 案例一：

 if you code this
 ```JavaScript
 return 
 a + b
 ```
 there will be 
 ```JavaScript
 return;
 a + b;
 ```

 - 案例二：

 ```JavaScript
 a = b + c
 (d + e).print()
 ```
 ```JavaScript
 a = b + c(d + e).print();
 ```
 
 - 案例三：
 
 ```JavaScript
 console.log("hello")
 [1, 2, 3].map(i=>console.log(i))
 ```
 ```JavaScript
 console.log("hello")[1,2,3].map(i=>console.log(i))
 ```
 此案例也可如下解决：
 ```JavaScript
 let indexArray = [1, 2, 3]
 indexArray.map(i=>console.log(i))
 ```
 
 > 总结：这样看来，分号是较安全的做法。如果你不想用分号，又怕出 问题，速记方案：如果你写 JS 代码不喜欢带分号，而又搞不清什么时 候必须加分号，可以这么做：在以 "("、"[" 、"/"、"+"、"-" 开头 的语句前面都加上一个分号。