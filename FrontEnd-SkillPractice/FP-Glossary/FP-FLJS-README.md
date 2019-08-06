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

### chapter8 递归:
- 普通递归
```javascript
function sum(total,...nums) {
	for (let i = 0; i < nums.length; i++) {
		total = total + nums[i];
	}

	return total;
}

// vs

function sum(num1,...nums) {
	if (nums.length == 0) return num1;
	return num1 + sum( ...nums );
}
```
- 二分递归(二分递归查找)
```javascript
function depth(node) {
	if (node) {
		let depthLeft = depth( node.left );
		let depthRight = depth( node.right );
		return 1 + Math.max( depthLeft, depthRight );
	}

	return 0;
}
```
- 相互递归

- 栈、堆
每个函数调用都将开辟出一小块称为堆栈帧的内存。堆栈帧中包含了函数语句当前状态的某些重要信息，包括任意变量的值。函数被它前一个函数调用时，这个函数帧会被“推”到最顶部。当这个函数调用结束后，它的帧会从堆栈中退出。
- 尾调用
> 如果一个回调从函数 baz() 转到函数 bar() 时候，而回调是在函数 baz() 的最底部执行 -- 也就是尾调用 -- 那么 baz() 的堆栈帧就不再需要了。也就意谓着，内存可以被回收。尾调用并不是递归特有的；它适用于任何函数调用。但是，在大多数情况下，你的手动非递归调用栈不太可能超过 10 级，因此尾调用对你程序内存的影响可能相当低。
 - 尾调用优化(TCO) : 尾调用它们的运行速度可能比普通回调还慢,TCO 是关于把尾调用更加高效运行的一些优化技术。
 - 正确的尾调用 (PTC) : 为了避免堆栈增加，PTC 要求所有的递归必须是在尾部调用，因此，二分法递归 —— 两次（或以上）递归调用 —— 是不能实现 PTC 的。但也许我们可以试着化整为零，把多重递归拆分成符合 PTC 规范的单个函数回调。
 ```javascript
//  ✅
return foo( .. );
return x ? foo( .. ) : bar( .. );
// ❌
foo();
return;

var x = foo( .. );
// 有些js引擎能够识别这样的书写，但是 这毕竟不符合规范
return x;

return 1 + foo( .. );
 ```
 - 重构递归:
	- 替换调用堆栈
	```javascript
	// 重构 之前编写写的求和函数
	// 符合了 PTC 规范，又保证了 sum(..) 参数的整洁性
	function sum(num1,num2,...nums) {
		num1 = num1 + num2;
		if (nums.length == 0) return num1;
		return sum( num1, ...nums );
	}
	sum( 3, 1, 17, 94, 8 );
	```
	- 后继传递格式 （CPS变换）
	 continuation 一词通常用于表示在某个函数完成后指定需要执行的下一个步骤的回调函数。组织代码，使得每个函数在其结束时接收另一个执行函数，被称为后继传递格式（CPS）。有些形式的递归，实际上是无法按照纯粹的 PTC 规范重构的，特别是相互递归。
	```javascript
	function fib(n) {
		if (n <= 1) return n;
		return fib( n - 2 ) + fib( n - 1 );
	}

	// identity(..)；它只简单的返回传递给它的任何东西。
	function fib(n,cont = identity) {
		if (n <= 1) return cont( n );
		return fib(
			n - 2,
			n2 => fib(
				n - 1,
				n1 => cont( n2 + n1 )
			)
		);
	}
	```

	- Trampolines
	Trampolines的优点之一是在非 PTC 环境下你一样可以应用此技术。另一个优点是每个函数都是正常调用，而不是 PTC 优化，所以它可以运行得更快。但是你需要将递归函数包裹在执行弹簧床功能的函数中; 此外，就像 CPS 一样，需要为每个后续函数创建闭包。然而，与 CPS 不一样的地方是，每个返回的后续数数，运行并立即完成，所以，当调用堆栈的深度用尽时，引擎中不会累积越来越多的闭包。
	```javascript
	function trampoline(fn) {
		return function trampolined(...args) {
			var result = fn( ...args );

			while (typeof result == "function") {
				result = result();
			}

			return result;
		};
	}
	var sum = trampoline(
		function sum(num1,num2,...nums) {
			num1 = num1 + num2;
			if (nums.length == 0) return num1;
			return () => sum( num1, ...nums );
		}
	);

	var xs = [];
	for (let i=0; i<20000; i++) {
		xs.push( i );
	}

	sum( ...xs );
	// 199990000
	```

### chapter9 列表操作:
- 映射
> map(..): 转换列表项的值到新列表。

- 过滤器
> filter(..): 选择或过滤掉列表项的值到新数组。

- 缩减器/累计器 (瑞士军刀): reduce(..): 合并列表中的值，并且产生一个其他的值（经常但不总是非列表的值）
	- Map 也是 Reduce
	```javascript
	var double = v => v * 2;

	[1,2,3,4,5].map( double );
	// [2,4,6,8,10]

	[1,2,3,4,5].reduce(
		(list,v) => (
			list.push( double( v ) ),
			list
		), []
	);
	// [2,4,6,8,10]
	```
	我们欺骗了这个缩减器，并允许采用 list.push(..) 去改变传入的列表所带来的副作用。一般来说，这并不是一个好主意，但我们清楚创建和传入 [] 列表，这样就不那么危险了。
	- Filter 也是 Reduce
	```javascript
	var isOdd = v => v % 2 == 1;

	[1,2,3,4,5].filter( isOdd );
	// [1,3,5]

	[1,2,3,4,5].reduce(
		(list,v) => (
			isOdd( v ) ? list.push( v ) : undefined,
			list
		), []
	);
	// [1,3,5]
	```
	这里有更加不纯的缩减器欺骗。不采用 list.push(..)，我们也可以采用 list.concat(..) 并返回合并后的新列表。
- 去重
- 扁平化(flatten)
- Zip:交替选择两个输入的列表中的值，并将得到的值组成子列表。
```javascript
function zip(arr1,arr2) {
	var zipped = [];
	arr1 = arr1.slice();
	arr2 = arr2.slice();

	while (arr1.length > 0 && arr2.length > 0) {
		zipped.push( [ arr1.shift(), arr2.shift() ] );
	}

	return zipped;
}
zip( [1,3,5,7,9], [2,4,6,8,10] );
// [ [1,2], [3,4], [5,6], [7,8], [9,10] ]
```
- 合并(merge)
- 方法 VS. 独立
	- 对比
	```javascript
	[1,2,3,4,5]
	.filter( isOdd )
	.map( double )
	.reduce( sum, 0 );					// 18

	//  采用独立的方法.

	reduce(
		map(
			filter( [1,2,3,4,5], isOdd ),
			double
		),
		sum,
		0
	);
	```
	两种方式的 API 实现了同样的功能。但它们的风格完全不同。很多函数式编程者更倾向采用后面的方式，但是前者在 Javascript 中毫无疑问的更常见。
	- 独立组合实用函数
	```javascript
	var double = v => v * 2;
	var isOdd = v => v % 2 == 1
	// 独立函数定义 
	var filter = (arr,predicateFn) => arr.filter( predicateFn );

	var map = (arr,mapperFn) => arr.map( mapperFn );

	var reduce = (arr,reducerFn,initialValue) =>
		arr.reduce( reducerFn, initialValue );
	
	// 数组上下文应该是第一个形参，而不是最后一个,采用右偏应用
	compose(
		partialRight( reduce, sum, 0 ),
		partialRight( map, double ),
		partialRight( filter, isOdd )
	)
	( [1,2,3,4,5] );

	// 柯里化 方式
	var filter = curry(
		(predicateFn,arr) =>
			arr.filter( predicateFn )
	);

	var map = curry(
		(mapperFn,arr) =>
			arr.map( mapperFn )
	);

	var reduce = curry(
		(reducerFn,initialValue,arr) =>
			arr.reduce( reducerFn, initialValue );	
	compose(
		reduce( sum )( 0 ),
		map( double ),
		filter( isOdd )
	)
	( [1,2,3,4,5] );
	```
	- 方法适配独立函数(方法 ---> 独立函数)
	```javascript
	// 使用工具实用函数  适配
	var unboundMethod =
		(methodName,argCount = 2) =>
			curry(
				(...args) => {
					var obj = args.pop();
					return obj[methodName]( ...args );
				},
				argCount
			);
	var filter = unboundMethod( "filter", 2 );
	var map = unboundMethod( "map", 2 );
	var reduce = unboundMethod( "reduce", 3 );

	compose(
		reduce( sum )( 0 ),
		map( double ),
		filter( isOdd )
	)
	( [1,2,3,4,5] );
	```
	- 独立函数适配为方法(独立函数 ---> 方法)
		- 采用额外的方法扩展内建的 Array.prototype (不推荐)
		- 把独立实用函数适配成一个缩减函数，并且将其传递给 reduce(..) 实例方法。
		```javascript
		// 刻意使用具名函数用于递归中的调用
		function flattenReducer(list,v) {
			return list.concat(
				Array.isArray( v ) ? v.reduce( flattenReducer, [] ) : v
			);
		}
		[ [1, 2, 3], 4, 5, [6, [7, 8]] ]
		.reduce( flattenReducer, [] )
		// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
		```
你会在简单列表中使用本章大多数的列表操作。但你会发现这个概念适用于你可能需要的任何数据结构和操作(因为它更普遍的意义是，以上这些操作可以在任一集合执行。)。

### chapter10 异步的函数式:
- 时间状态: 在你所有的应用里，最复杂的状态就是时间。当你操作的数据状态改变过程比较直观的时候，是很容易管理的。但是，如果状态随着时间因为响应事件而隐晦的变化，管理这些状态的难度将会成几何级增长。
	- promise,获取 promise 的返回值是异步的，但却是通过同步的方法来赋值。通过可靠的（时间无关）方式 给 = 操作符扩展随时间动态赋值的功能，

- 积极的 vs 惰性的
	- 积极的: 同步（即时）地操作着离散的即时值或值的列表/结构上的值。
	- 惰性的: 
	```javascript
	var a = [];

	var b = mapLazy( a, v => v * 2 );

	a.push( 1 );

	a[0];		// 1
	b[0];		// 2

	a.push( 2 );

	a[1];		// 2
	b[1];		// 4
	```
	想象下 mapLazy(..) (未被实现的虚构方法) 本质上 “监听” 了数组 a，只要一个新的值添加到数组的末端（使用 push(..)），它都会运行映射函数 v => v * 2 并把改变后的值添加到数组 b 里。
- 响应式函数式编程(事件机制函数式编程)
	- 声明式
	```javascript
	// 生产者:
	// 虚构的 LazyArray
	var a = new LazyArray();

	setInterval( function everySecond(){
		a.push( Math.random() );
	}, 1000 );


	// **************************
	// 消费者:

	var b = a.map( function double(v){
		return v * 2;
	} );

	b.listen( function onValue(v){
		console.log( v );
	} );
	```
	a 是一个行为本质上很像数据流的生产者。我们可以把每个值赋给 a 当作一个事件。map(..) 操作会触发 b 上面的 listen(..) 事件来消费新的值。
	- 命令式
	```javascript
	// 生产者:

	var a = {
		onValue(v){
			b.onValue( v );
		}
	};

	setInterval( function everySecond(){
		a.onValue( Math.random() );
	}, 1000 );


	// **************************
	// 消费者:

	var b = {
		map(v){
			return v * 2;
		},
		onValue(v){
			v = this.map( v );
			console.log( v );
		}
	};
	```
	命令式强硬的把代码 b.onValue(..) 夹杂在生产者 a 的逻辑里，这有点违反了关注点分离原则。这将会让分离生产者和消费者变得困难。
	- Observables
	> 你应该已经察觉到响应式，事件式，类数组结构的数据的重要性，就像我们虚构出来的 LazyArray 一样。值得高兴的是，这类的数据结构已经存在的了，它就叫 observable。现在已经有各种各样的 Observables 的库类， 最出名的是 RxJS 和 Most。正好也有一个直接向 JS 里添加 observables 的建议（2017），就像 promise。
	```javascript
	// RxJS
	// 生产者:

	var a = new Rx.Subject();

	setInterval( function everySecond(){
		a.next( Math.random() );
	}, 1000 );


	// **************************
	// 消费者:

	var b = a.map( function double(v){
		return v * 2;
	} );

	b.subscribe( function onValue(v){
		console.log( v );
	} );

	// ---------------------
	// 生产者:

	var a = Rx.Observable.create( function onObserve(observer){
		setInterval( function everySecond(){
			observer.next( Math.random() );
		}, 1000 );
	} );
	var b =
		a
		.filter( v => v % 2 == 1 )		// 过滤掉偶数
		.distinctUntilChanged()			// 过滤连续相同的流
		.throttle( 100 )				// 函数节流（合并100毫秒内的流）
		.map( v = v * 2 );				// 变2倍

	b.subscribe( function onValue(v){
		console.log( "Next:", v );
	} );
	```
	- 异步操作支持串行和并发迭代，并发或串行异步 （fasy 库--author本书作者）
> 最常用到这些函数式编程的是响应式函数式编程(FRP)。我故意避开这个术语是因为一个有关于 FP + Reactive 是否真的构成 FRP 的辩论。我们不会全面深入了解 FRP 的所有含义，所以我会继续称之为响应式函数式编程。或者，你也可以称之为事件机制函数式编程。

### chapter11 融会贯通:


### 附录
- Transducing:transduer 是可组合的 reducer,使用transduer来组合相邻的map(..)、filter(..) 和 reduce(..) 操作。transducing 是针对那些不能被直接组合的函数，使用的一种更具声明式风格进行组合，否则这些函数将不能直接组合。
- Monad
	- 类型：Monad 是一种数据结构。是一种类型。它是一组使处理某个值变得可预测的特定行为。
	- 函子(functor)：包括一个值和一个用来对构成函子的数据执行操作的类 map 实用函数。Monad 是一个包含一些额外行为的函子（functor）。
	- 松散接口：Monad 并不是单一的数据类型，它更像是相关联的数据类型集合。它是一种根据不同值的需要而用不同方式实现的接口。每种实现都是一种不同类型的 Monad。你可能听过 "Identity Monad"、"IO Monad"、"Maybe Monad"、"Either Monad" 或其他形形色色的字眼。