// 开发中总是存在着各种状态的保持。都是字段的话，相当麻烦。使用二进制状态存储就方便多了。现在一个int值你可以保存32个开关了。 
// 10111 = 2^4+2^2+2^1+2^0=16+4+2+1=23
// 第1个开关（10111右边第1位） 23&2^(1-1)=23&1=1   二进制是1   位运算 1>>(1-1)=1 表示开
// 第2个开关（10111右边第2位） 23&2^(2-1)=23&2=2   二进制是10  位运算 2>>(2-1)=1 表示开
// 第n个开关（10111右边第n位） 23&2^(n-1)=a        二进制是1...n-1个零    位运算 a>>(n-1)=1 表示X

function binaraySwitch(bitstring) {
  bitstring = `0b${bitstring}`
  function booleanValue(bits, index) {
    console.log(bits & (2 ** index))
    console.log(bits & (2 ** index) >> (index))

    return Boolean((bits & (2 ** index)) >> index)
  }
  return new Array(5).fill(undefined).map(i => booleanValue(bitstring, i))
}


  // “一些设计模式（如装饰模式、职责链模式、状态模式、访问者模式等）就是为了赋予静态语言一定的动态特征。”