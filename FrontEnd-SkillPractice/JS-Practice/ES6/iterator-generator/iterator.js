// 遍历器（Iterator）就是这样一种机制。
// 它是一种接口，为各种不同的数据结构提供统一的访问机制。
// 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作

// 迭代器的工作原理
// 创建一个指针对象，指向数据结构的起始位置。 
// 第一次调用next方法，指针自动指向数据结构的第一个成员 
// 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员 
// 每调用next方法返回的是一个包含value和done的对象，
// {value: 当前成员的值,done: 布尔值} 
// value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。 
// 当遍历结束的时候返回的value值是undefined，done值为true


// 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
// 当使用for of去遍历某一个数据结构的 时候，
// 或使用扩展运算符（...）或对数组和 Set 结构进行解构赋值时
// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
// 首先去找Symbol.iterator（原型链上的对象具有该方法也可），
// 找到了就去遍历，没有找到的话不能遍历，提示 Uncaught TypeError: XXX is not iterable


// 模拟next方法返回值
function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
        //   对于遍历器对象来说，done: false和value: undefined属性都是可以省略的
        // return nextIndex < array.length ?
        //     {value: array[nextIndex++]} :
        //     {done: true};
      }
    };
}


// 默认 Iterator 接口

// 为对象添加 Iterator 接口
let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator] : function () {
      const self = this;
      let index = 0;
      return {
        next() {
          if (index < self.data.length) {
            return {
              value: self.data[index++],
              done: false
            };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
};

// 在 类上 部署 Iterator 接口
class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
  
    [Symbol.iterator]() { return this; }
  
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
}
  
function range(start, stop) {
    return new RangeIterator(start, stop);
}
  
for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
}

// 使用 Generator 函数将对象重新包装
function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
}
  
for (let [key, value] of entries(obj)) {
    console.log(key, '->', value);
}
  // a -> 1
  // b -> 2
  // c -> 3