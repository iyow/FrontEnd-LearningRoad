## [Functional-Light-JS](https://github.com/getify/functional-light-js)  Notes:

### chapter2:
- 函数和程序（显示输出，隐式输出(副作用)）：
    - 程序就是一个任意的功能集合。它或许有许多个输入值，或许没有。它或许有一个输出值（ return 值），或许没有。
    - 函数则是接收输入值，并明确地 return 值

- 匿名函数和命名(命名或者字面量名称引用)函数
    - 命名函数好处：
        - 便于查询函数在堆栈中的轨迹，便于调试。当名称不能直接从周围的语法中被推断时，它仍会是一个空字符串。这样的函数将在堆栈轨迹中的被报告为一个 (anonymous function)。
        - 函数被命名还有一个其他好处。首先，句法名称（又称词汇名）是可以被函数内部的自引用。自引用是递归（同步和异步）所必需的，也有助于事件处理(removeEvent)。
    - 箭头函数：
        - 在函数式编程中， => 令人兴奋的地方在于它几乎完全遵循函数的数学符号，特别是像 Haskell 这样的函数式编程语言。=> 箭头函数语法甚至可以用于数学交流。
        - 箭头函数是词法匿名的，这让我不能遵守刚刚所说的命名原则了：阅读困难，调试困难(anonymous function)，无法自我引用。

### chapter3 管理函数的输入:
- 多参数只接受一个:
```javascript
function unary(fn) {
    return function onlyOneArg(arg){
        return fn( arg );
    };
}
var unary =
    fn =>
        arg =>
            fn( arg );
["1","2","3"].map( parseInt );
// [1,NaN,NaN]
// 造成原因
// map传入三个参数 value, idx, arr
// parseInt接受两个个参数string, radix.
["1","2","3"].map( unary( parseInt ) );
// [1,2,3]
```
- 一对一:
```javascript
function identity(v) {
    return v;
}

// or the ES6 => arrow form
var identity =
    v =>
        v;
// 这个看上去好像没什么用处.但在FP的世界它作用很大

// example1
var words = "   Now is the time for all...  ".split( /\s|\b/ );
// ["","Now","is","the","time","for","all","...",""]
words.filter( identity );
// ["Now","is","the","time","for","all","..."]

// example2
function output(msg,formatFn = identity) {
    msg = formatFn( msg );
    console.log( msg );
}

function upper(txt) {
    return txt.toUpperCase();
}

output( "Hello World", upper );     // HELLO WORLD
output( "Hello World" );            // Hello World
```
- 偏函数(部分先传部分后传):
> 偏函数严格来讲是一个减少函数参数个数（arity）的过程；这里的参数个数指的是希望传入的形参的数量。
```javascript
function partial(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
        // 闭包
        // 内部函数 partiallyApplied(..) 封闭（closes over）了 fn 和 presetArgs 变量
		return fn( ...presetArgs, ...laterArgs );
	};
}
var partial =
	(fn, ...presetArgs) =>
		(...laterArgs) =>
			fn( ...presetArgs, ...laterArgs );

// 偏应用
function add(x,y) {
	return x + y;
}
[1,2,3,4,5].map( function adder(val){
	return add( 3, val );
} );
// [4,5,6,7,8]
[1,2,3,4,5].map( partial( add, 3 ) );
// [4,5,6,7,8]
```
- 颠倒实参顺序(部分颠倒)：
```javascript
// 只是调用时传的实参顺序颠倒了
// 其实函数的形参顺序并未改变
function reverseArgs(fn) {
	return function argsReversed(...args){
		return fn( ...args.reverse() );
	};
}

var reverseArgs =
	fn =>
		(...args) =>
			fn( ...args.reverse() );
// 右偏应用实参
// 实现一
function partialRight( fn, ...presetArgs ) {
	return reverseArgs(
		partial( reverseArgs( fn ), ...presetArgs.reverse() )
	);
}
// 实现二
function partialRight(fn,...presetArgs) {
    return function partiallyApplied(...laterArgs){
        return fn( ...laterArgs, ...presetArgs );
    };
}

var partialRight =
    (fn,...presetArgs) =>
        (...laterArgs) =>
            fn( ...laterArgs, ...presetArgs );
```
- 柯里化(currying,一次传一个,一个一个地传参):
> 注意，大多数流行的 JavaScript 函数式编程库都使用了一种并不严格的柯里化（loose currying）定义。具体来说，往往 JS 柯里化实用函数会允许你在每次柯里化调用中指定多个实参。是一种松散的柯里化。
```javascript
function curry(fn,arity = fn.length) {
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			var args = prevArgs.concat( [nextArg] );

			if (args.length >= arity) {
				return fn( ...args );
			}
			else {
				return nextCurried( args );
			}
		};
	})( [] );
}
var curry =
	(fn, arity = fn.length, nextCurried) =>
		(nextCurried = prevArgs =>
			nextArg => {
				var args = prevArgs.concat( [nextArg] );

				if (args.length >= arity) {
					return fn( ...args );
				}
				else {
					return nextCurried( args );
				}
			}
		)( [] );
```
> partial(add,3) 和 curry(add)(3) 两者有什么不同呢？为什么你会选 curry(..) 而不是偏函数呢？当你先得知 add(..) 是将要被调整的函数，但如果这个时候并不能确定 3 这个值，柯里化可能会起作用。
```javascript
// 柯里化是和偏应用相似的
// 我们可以用几乎相同的方式以柯里化来完成那个例子
[1,2,3,4,5].map( curry( add )( 3 ) );
// [4,5,6,7,8]

var adder = curry( add );
// later
[1,2,3,4,5].map( adder( 3 ) );
// [4,5,6,7,8]
```

- 柯里化和偏应用有什么用？
> 无论是柯里化风格（sum(1)(2)(3)）还是偏应用风格（partial(sum,1,2)(3)），它们的签名比普通函数签名奇怪得多。那么，在适应函数式编程的时候，我们为什么要这么做呢？答案有几个方面。
首先是显而易见的理由，使用柯里化和偏应用可以将指定分离实参的时机和地方独立开来（遍及代码的每一处），而传统函数调用则需要预先确定所有实参。如果你在代码某一处只获取了部分实参，然后在另一处确定另一部分实参，这个时候柯里化和偏应用就能派上用场。
另一个最能体现柯里化应用的的是，当函数只有一个形参时，我们能够比较容易地组合它们。因此，如果一个函数最终需要三个实参，那么它被柯里化以后会变成需要三次调用，每次调用需要一个实参的函数。当我们组合函数时，这种单元函数的形式会让我们处理起来更简单。

- 反柯里化
反柯里化的函数行为并非完全与原函数相同，如果你传入原函数期望数量的实参，那么函数的行为大多数情况下都相同，然而如果你少传了实参就决会得到一个仍然等待传入更多参数的部分柯里化函数。反柯里化函数最为常见的作用对象很可能并不是人为生成的柯里化函数，而是某些操作所产生的已经被柯里化了的结果函数。
```javascript
// 简单实现
function uncurry(fn) {
	return function uncurried(...args){
		var ret = fn;
		for (let i = 0; i < args.length; i++) {
			ret = ret( args[i] );
		}
		return ret;
	};
}

// ES6 箭头函数形式
var uncurry =
	fn =>
		(...args) => {
			var ret = fn;

			for (let i = 0; i < args.length; i++) {
				ret = ret( args[i] );
			}

			return ret;
		};
```

- 无形参风格
```javascript
// 辅助函数
function when(predicate,fn) {
	return function conditional(...args){
		if (predicate( ...args )) {
			return fn( ...args );
		}
	};
}
var when =
	(predicate,fn) =>
		(...args) =>
			predicate( ...args ) ? fn( ...args ) : undefined;


function not(predicate) {
	return function negated(...args){
		return !predicate( ...args );
	};
}
var not =
	predicate =>
		(...args) =>
			!predicate( ...args );
// use			
function output(txt) {
	console.log( txt );
}
function isShortEnough(str) {
	return str.length <= 5;
}
var isLongEnough = not( isShortEnough );
var printIf = uncurry( rightPartial( when, output ) );

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf( isShortEnough, msg1 );			// Hello
printIf( isShortEnough, msg2 );

printIf( isLongEnough, msg1 );
printIf( isLongEnough, msg2 );			// Hello World
```

- 参数顺序问题：
可以是使用对象形参（object parameters）和命名实参（named arguments）模式，通过减少由调整实参顺序带来的干扰，明显地提高了代码的可读性，不过据知，没有哪个主流的函数式编程库使用该方案。所以你会看到该做法与大多数 JavaScript 函数式编程很不一样.
```javascript
function partialProps(fn,presetArgsObj) {
	return function partiallyApplied(laterArgsObj){
		return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
	};
}

function curryProps(fn,arity = 1) {
	return (function nextCurried(prevArgsObj){
		return function curried(nextArgObj = {}){
			var [key] = Object.keys( nextArgObj );
			var allArgsObj = Object.assign( {}, prevArgsObj, { [key]: nextArgObj[key] } );

			if (Object.keys( allArgsObj ).length >= arity) {
				return fn( allArgsObj );
			}
			else {
				return nextCurried( allArgsObj );
			}
		};
	})( {} );
}
function foo({ x, y, z } = {}) {
	console.log( `x:${x} y:${y} z:${z}` );
}

var f1 = curryProps( foo, 3 );
var f2 = partialProps( foo, { y: 2 } );

f1( {y: 2} )( {x: 1} )( {z: 3} );
// x:1 y:2 z:3

f2( { z: 3, x: 1 } );
// x:1 y:2 z:3
```

### chapter4 组合函数:
> 组合 —— 声明式数据流 —— 是支撑函数式编程其他特性的最重要的工具之一.这样做的一种有效方法是将complected（交织缠绕的，紧紧编织在一起）代码解开为单独的，更简单的（松散绑定的）代码片段。

```javascript
// compose 循环实现
function compose(...fns) {
	return function composed(result){
		// 拷贝一份保存函数的数组
		var list = fns.slice();

		while (list.length > 0) {
			// 将最后一个函数从列表尾部拿出
			// 并执行它
			result = list.pop()( result );
		}

		return result;
	};
}
// compose 递归实现
function compose(...fns) {
	// 拿出最后两个参数
	var [ fn1, fn2, ...rest ] = fns.reverse();

	var composedFn = function composed(...args){
		return fn2( fn1( ...args ) );
	};

	if (rest.length == 0) return composedFn;

	return compose( ...rest.reverse(), composedFn );
}

// compose 借助reduce实现
function compose(...fns) {
	return fns.reverse().reduce( function reducer(fn1,fn2){
		return function composed(...args){
			return fn2( fn1( ...args ) );
		};
	} );
}
var compose =
	(...fns) =>
		fns.reverse().reduce( (fn1,fn2) =>
			(...args) =>
				fn2( fn1( ...args ) )
		);

// pipe
// pipe 与 compose(..) 一模一样，除了它将列表中的函数从左往右处理
// 这个名字据说来自 Unix/Linux 界，
// 那儿大量的程序通过“管道传输”（| 运算符）第一个的输出到第二个的输入，等等（即，ls -la | grep "foo" | less）
function pipe(...fns) {
	return function piped(result){
		var list = fns.slice();

		while (list.length > 0) {
			// 从列表中取第一个函数并执行
			result = list.shift()( result );
		}

		return result;
	};
}
// 实际上，我们只需将 compose(..) 的参数反转就能定义出来一个 pipe(..)。
var pipe = reverseArgs( compose )

function StringToUpperCase(x) {
	return x.toLocaleUpperCase()
}
function StringSplit(x) {
	return x.split('')
}

let ca = compose(StringSplit, StringToUpperCase)
let pa = pipe(StringToUpperCase, StringSplit)
console.log(ca('from right to left'))
console.log(pa('from left to rifht'))
```

### chapter5 减少副作用:
- 幂等
	- 数学中的幂等：从数学的角度来看，幂等指的是在第一次调用后，如果你将该输出一次又一次地输入到操作中，其输出永远不会改变的操作。
	```javascript
	// 典型的数学例子
	Math.abs(Math.abs(Math.abs(...)))
	Math.min(Math.min(Math.min(...)))
	Math.round(Math.round(Math.round(...)))
	...
	// 不仅限于数学运算
	let x = "hello"
	String(x) === String(String(x))
	Boolean(x) === Boolean(Boolean(x))
	// 之前提到的 函数式编程工具 identity
	identity(3) === identity(identity(3))
	// 某些字符串操作 甚至一些更复杂的字符串操作
	function upper(x){
		x.toUpperCase()
	}
	upper(x) === upper(upper(x))
	```
	- 编程中的幂等：幂等的面向程序的定义也是类似的，但不太正式。编程中的幂等仅仅是结果相等而不是要求f(x) === f(f(x))。纯函数是一种幂等函数（注意:JS 的动态值引用特性(以及this)使其很容易产生不明显的副作用而导致不纯）。纯函数更容易被memoization。
	```javascript
	function add(x,y){
		return x+y
	}
	// 调用多次和一次add 结果是相等的
	add(3,4)
	```

### chapter6 值不可变性:
> 值的不可变性是指当需要改变程序中的状态时，我们不能改变已存在的数据，而是必须创建和跟踪一个新的数据。

- const,关键字声明的常量通常被误认为是强制规定数据不可被改变。事实上，const 和值的不可变性声明无关，而且使用它所带来的困惑似乎比它解决的问题还要大。
- Object.freeze(..),方法提供了顶层值的不可变性设定。大多数情况下，使用它就足够了。
- Immutable.js,每次都创建新的数据或对象（特别是在数组或对象包含很多数据时）处于对计算和存储空间的考量,这是非常不可取的。通过类似 Immutable.js 的库使用不可变数据结构或许是个较好的主意。

### chapter7 闭包 VS. 对象:
许多语言实际上通过对象实现了闭包。另一些语言用闭包的概念实现了对象。
> 1. 一个没有闭包的编程语言可以用对象来模拟闭包。
> 2. 一个没有对象的编程语言可以用闭包来模拟对象。
- 相似点
	- 状态
	```javascript
	// 闭包
	function outer() {
		let x = 10
		let y = 12
		let z = 14
		return middle
		function middle(){
			let deepX = 999
			let deepY = 888
			let deepZ = 666
			// 创建并返回了一个新的数组（亦然是一个对象）。这是因为 JS 不提供返回多个数据却不包装在一个对象中的能力。
			return function inner() {
				return [x,y,z,deepX,deepY,deepZ]
			}
		}
	}
	// 对象
	let point = {
		x: 10,
		y: 12,
		z: 14,
		deep: {
			deepX: 999,
			deepY: 888,
			deepZ: 666
		}
	}
	// ------------------------
	function point(x1,y1) {
		return function distFromPoint(x2,y2){
			return Math.sqrt(
				Math.pow( x2 - x1, 2 ) +
				Math.pow( y2 - y1, 2 )
			);
		};
	}
	var pointDistance = point( 1, 1 );
	pointDistance( 4, 5 );		// 5

	function pointDistance(point,x2,y2) {
		return Math.sqrt(
			Math.pow( x2 - point.x1, 2 ) +
			Math.pow( y2 - point.y1, 2 )
		);
	};

	pointDistance(
		{ x1: 1, y1: 1 },
		4,	// x2
		5	// y2
	);
	// 5
	```
	- 行为
	对象和闭包不仅是表达状态集合的方式，将数据和行为捆绑为有一个充满想象力的名字：封装。
	```javascript
	// 对象
	var person = {
		firstName: "Kyle",
		lastName: "Simpson",
		first() {
			return this.firstName;
		},
		last() {
			return this.lastName;
		}
	}

	person.first() + " " + person.last();
	// Kyle Simpson

	// 闭包
	function createPerson(firstName,lastName) {
		return API;

		// ********************
		function API(methodName) {
			switch (methodName) {
				case "first":
					return first();
					break;
				case "last":
					return last();
					break;
			};
		}

		function first() {
			return firstName;
		}

		function last() {
			return lastName;
		}
	}

	var person = createPerson( "Kyle", "Simpson" );

	person( "first" ) + " " + person( "last" );
	// Kyle Simpson
	```
	- 不可变
	```javascript
	function outer() {
		var x = 1;
		// 拆解
		// var y = [2,3];
		return middle();

		// ********************

		function middle() {
			var y0 = 2;
			var y1 = 3;

			return function inner(){
				// 拆解
				// return [ x, y[0], y[1] ];
				return [ x, y0, y1 ];
			};
		}
	}

	var xyPublic = {
		x: 1,
		// 拆解
		// y: [2,3]
		y: {
			0: 2,
			1: 3
		}
	};

	```
	在最底层，所有的状态数据都是基本类型，而所有基本类型都是不可变值。不论是用嵌套对象还是嵌套闭包代表状态，这些被持有的值都是不可变的。
	- 内部结构
	```javascript
	// 闭包
	function outer() {
		var x = 1;

		return function inner(){
			return x;
		};
	}

	scopeOfOuter = {
		x: 1
	};
	// 内部作用域
	scopeOfInner = {};
	Object.setPrototypeOf( scopeOfInner, scopeOfOuter );
	// 建立词法 变量引用
	return scopeOfInner.x;
	```
	scopeOfInner 并没有一个 x 的属性，当他的 [[Prototype]] 连接到拥有 x 属性的 scopeOfOuter时。通过原型委托访问 scopeOfOuter.x 返回值是 1。这都只是概念。并不能说 JS 引擎使用对象和原型。但它完全有道理，它可以同样地工作。
- 同构
	- 函数的数学定义是一个输入和输出之间的映射。这在学术上称为态射。同构是双映（双向）态射的特殊案例，它需要映射不仅仅必须可以从任意一边完成，而且在任一方式下反应完全一致。
	- 闭包和对象是状态的同构表示（及其相关功能）
- 不同
- 结构可变性
从概念上讲，闭包的结构不是可变的（当然假设你使用严格模式并且／或者没有使用作弊手段例如 eval(..)）。
- 私有可见性，变更控制，状态可拷贝
闭包通过词法作用域提供“私有”状态，信息隐藏。使有了闭包，你就有了一些可以更改代码的权限，而剩余的程序是受限的。
- 性能
从实现的角度看，对象有一个比闭包有利的原因，那就是 JavaScript 对象通常在内存和甚至计算角度是更加轻量的。但是需要小心这个普遍的断言：有很多东西可以用来处理对象，这可能会影响你从闭包转向对象时获得的任何性能增益。性能观察结果不是绝对的，在一个给定场景下决定什么是最好的是非常复杂的。不要随意使用你从别人那里听到的或者是你从之前一些项目中看到的。最好小心地决定使用对象还是闭包。
