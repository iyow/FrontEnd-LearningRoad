// Constant （常量）
// A variable that cannot be reassigned once defined.（一旦定义就无法重新分配的变量）

const five = 5
const john = Object.freeze({name: 'John', age: 30})

// Constants are referentially transparent.
// That is, they can be replaced with the values that they represent without affecting the result.
// 常量是引用透明的。也就是说，它们可以替换为它们所代表的值而不会影响结果。

// With the above two constants the following expression will always return true.
// 使用以上两个常量，以下表达式将始终返回true。
john.age + five === ({name: 'John', age: 30}).age + (5)