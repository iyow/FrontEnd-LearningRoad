// Symbol.iterator
console.log("----------- %c Symbol.iterator ", "color:yellow");

var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]) // [1, 2, 3]



// Symbol.asyncIterator
console.log("----------- %c Symbol.asyncIterator ", "color:yellow");

const myAsyncIterable = new Object();
myAsyncIterable[Symbol.asyncIterator] = async function* () {
    yield "hello";
    yield "async";
    yield "iteration!";
};

(async () => {
    for await (const x of myAsyncIterable) {
        console.log(x);
    }
})();



// Symbol.match
console.log("----------- %c Symbol.match ", "color:yellow");

try {
    "/bar/".startsWith(/bar/);
} catch {}
// Throws TypeError, 因为 /bar/ 是一个正则表达式
// 且 Symbol.match 没有修改。
var re = /foo/;
re[Symbol.match] = false;
console.log("/foo/".startsWith(re), "/baz/".endsWith(re))



// Symbol.replace
console.log("----------- %c Symbol.match ", "color:yellow");

class MyReplaceRegExp extends RegExp {
    // regexp[Symbol.replace](str, newSubStr|function)
    [Symbol.replace](str) {
        // 直接调用 父级方法
        // return super[Symbol.replace].call(this, str, '#!@?')
        return RegExp.prototype[Symbol.replace].call(this, str, '#!@?');
        // return '糟糕被修改了';
    }
}
// 直接调用 和 通过 子类调用
console.log(new MyReplaceRegExp('foo')[Symbol.replace]('nihaoa'))
console.log('football'.replace(new MyReplaceRegExp('foo')));



// Symbol.search
console.log("----------- %c Symbol.search ", "color:yellow");
class MySearchRegExp extends RegExp {
    constructor(str) {
        super(str)
        this.pattern = str;
    }
    // regexp[Symbol.search](str)
    [Symbol.search](str) {
        return str.indexOf(this.pattern);
    }
}
var reSearch = new MySearchRegExp('a+b');
var str = 'ab a+b';
// 直接调用
console.log(reSearch[Symbol.search](str))
// String.prototype.search 默认调用 reSearch[@@search].
console.log(str.search(reSearch));



// Symbol.split
console.log("----------- %c Symbol.split ", "color:yellow");
// 直接调用
/a/ [Symbol.split]('aba', 3)
// 带有[Symbol.split]的对象
var splitExp = {
    pat: 'in',
    // regexp[Symbol.split](str[, limit])
    [Symbol.split](str) {
        return str.split(this.pat);
    }
}
console.log("dayinlove".split(splitExp))



// Symbol.hasInstance
console.log("----------- %c Symbol.hasInstance ", "color:yellow");
class MyArray {
    static[Symbol.hasInstance](instance) {
        console.log(instance)
        return Array.isArray(instance);
    }
}
let isPrimitiveype = {
    [Symbol.hasInstance](instance) {
        return ['undefined',
            'null',
            'symbol',
            'boolean',
            'string',
            'number'
        ].includes(typeof instance)
    }
}
console.log([] instanceof MyArray);
console.log([1, 2] instanceof isPrimitiveype)


// Symbol.isConcatSpreadable
console.log("----------- %c Symbol.isConcatSpreadable ", "color:yellow");
var alpha = ['a', 'b', 'c'],
    numeric = [1, 2, 3];
numeric[Symbol.isConcatSpreadable] = false;
var alphaNumeric = alpha.concat(numeric);
console.log(alphaNumeric);

var fakeArray = {
    [Symbol.isConcatSpreadable]: true,
    length: 2,
    0: "hello",
    1: "world"
}
console.log([1, 2, 3].concat(fakeArray))



// Symbol.unscopables
console.log("----------- %c Symbol.unscopables ", "color:yellow");
var obj = {
    foo: 1,
    bar: 2
};
obj[Symbol.unscopables] = {
    foo: false,
    bar: true
};
with(obj) {
    console.log(foo); // 1
    console.log(bar); // ReferenceError: bar is not defined
}


// Symbol.species
console.log("----------- %c Symbol.species ", "color:yellow");
class MyNoSpeciesArray extends Array {}
class MySpeciesArray extends Array {
    // 覆盖 species 到父级的 Array 构造函数上
    static get[Symbol.species]() {
        return Array;
    }
}
var aMyNoSpeciesArray = new MyNoSpeciesArray(6, 6, 6)
var aMySpeciesArray = new MySpeciesArray(1, 2, 3);
var mappedMySpeciesArray = aMySpeciesArray.map(x => x * x);

console.log(MyNoSpeciesArray[Symbol.species])
console.log(aMyNoSpeciesArray instanceof MyNoSpeciesArray);
console.log(aMyNoSpeciesArray instanceof Array);

console.log(mappedMySpeciesArray instanceof MySpeciesArray);
console.log(mappedMySpeciesArray instanceof Array);



// Symbol.toPrimitive
console.log("----------- %c Symbol.toPrimitive ", "color:yellow");
// 一个没有提供 Symbol.toPrimitive 属性的对象，参与运算时的输出结果
var obj1 = {};
console.log(+obj1);
console.log(`${obj1}`);
console.log(obj1 + "");

// 接下面声明一个对象，手动赋予了 Symbol.toPrimitive 属性，再来查看输出结果
var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == "number") {
            return 10;
        }
        if (hint == "string") {
            return "hello";
        }
        return true;
    }
};
console.log(+obj2); // 10      -- hint 参数值是 "number"
console.log(`${obj2}`); // "hello" -- hint 参数值是 "string"
console.log(obj2 + ""); // "true"  -- hint 参数值是 "default"


// Symbol.toStringTag
console.log("----------- %c Symbol.toStringTag ", "color:yellow");
// 许多内置的 JavaScript 对象类型即便没有 toStringTag 属性，
// 也能被 toString() 方法识别并返回特定的类型标签
Object.prototype.toString.call('foo'); // "[object String]"
Object.prototype.toString.call([1, 2]); // "[object Array]"
Object.prototype.toString.call(3); // "[object Number]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
// ... and more

// 另外一些对象类型则不然，
// toString() 方法也能识别它们是因为引擎为它们设置好了 toStringTag 标签：
Object.prototype.toString.call(new Map()); // "[object Map]"
Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
// ... and more

// 但你自己创建的类不会有这份特殊待遇
// toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签
// 加上 toStringTag 属性，你的类也会有自定义的类型标签了：
class ValidatorClass {
    get[Symbol.toStringTag]() {
        return "Validator";
    }
}
Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"