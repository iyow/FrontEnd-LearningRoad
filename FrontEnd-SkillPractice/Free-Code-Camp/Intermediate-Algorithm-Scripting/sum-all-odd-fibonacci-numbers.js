// 给一个正整数num，返回小于或等于num的斐波纳契奇数之和。
// 斐波纳契数列中的前几个数字是 1、1、2、3、5 和 8，随后的每一个数字都是前两个数字之和。
// 例如，sumFibs(4)应该返回 5，因为斐波纳契数列中所有小于4的奇数是 1、1、3。
// 提示：此题不能用递归来实现斐波纳契数列。因为当num较大时，内存会溢出，推荐用数组来实现。


// 数组太大也会内存溢出
function sumFibs1(num) {
    let fib = [1, 1];
    let length = 2;
    while (fib[length - 1] < num) {
        fib.push(fib[length - 1] + fib[length - 2]);
        length = fib.length;
    }
    console.log(fib);
    return fib.reduce((count, value, index, arr) => {
        return value & 1 && value <= num ? count + value : count;
    }, 0);
}
function sumFibs2(num) {
    let fib = [1, 1];
    let sum = 1;
    while (fib[1] <= num) {
        if (fib[1] & 1) {
            sum = sum + fib[1];
        }
        fib.push(fib[0] + fib[1]);
        fib.shift();
    }
    return sum;
}

function sumFibs(num) {
    let a = 1;
    let b = 1;
    let sum = 1;
    while (b <= num) {
        if (b & 1) {
            sum = sum + b;
        }
        b = a + b;
        a = b - a;
    }
    return sum;
}
console.log(sumFibs(4));
cosnsumFibs(75024)
sumFibs(75025)