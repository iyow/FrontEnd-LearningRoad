// Referential Transparency(引用透明性)
// An expression that can be replaced with its value without changing the behavior of the program is said to be referentially transparent.
// 在不改变程序行为的情况下可以用其值替换的表达式被认为是引用透明的。

// 或者说函数的返回值只依赖于其输入值，这种特性就称为引用透明性
// 假设我们有函数greet：
// Say we have function greet:

const greet = () => 'Hello World!'
// Any invocation of greet() can be replaced with Hello World! hence greet is referentially transparent.
// 任何greet()调用都可以替换为Hello World！因此greet是引用透明的。



// 动态规划所使用的制表法（也即缓存）只能应用于具有引用透明性的函数。
// 如果外在因素使相同输入值返回不同结果值，则不能缓存。

// 也即缓存对应的 map，实现的是同一个输入（key），同一个输出（value），
// 而不可能出现同一个输入，可以得到不同的输出，也即输出结果的不确定性。