// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同 
// 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。 
// Generator 函数除了状态机，还是一个遍历器对象（Iterator）生成函数。 
// 可暂停函数(惰性求值), yield可暂停，next方法可启动。每次返回的是yield后的表达式结果

// 调用方法 Generator 函数并不会执行 
// Generator 函数是分段执行的，调用next方法 函数内部逻辑开始执行，遇到yield表达式停止

// function关键字与函数名之间有一个星号 *
// yield 表达式 定义不同状态
function* helloWorldGenerator(){
	yield 'hello'
	yield 'world'
	return 'ending'
}

let helloworld = helloWorldGenerator()
console.log(helloworld)
helloworld.next()
helloworld.next()
helloworld.next()

let array = [1,[2,[3,4]],5,6]
const flatAll = function* (arr){
	let currentLength = arr.length
	for(let i = 0;i < currentLength;i++){
		let item = arr[i]
		if(typeof item !== 'number'){
			yield* flatAll(item)
		} else {
			yield item
		}
	}
}

function* iterTree(tree){
	if(Array.isArray(tree)){
	  for(let i = 0;i < tree.length;i++){
		  yield* iterTree(tree[i])
		}
	} else{
	  yield tree	
	}
}

for(let f of flatAll(array)){
	console.log(f)	
}
for(let f of iterTree(array)){
	console.log(f)
}


function* willNoReturn() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of willNoReturn()) {
  console.log(v);
}
// 1 2 3 4 5

// return 语句的返回值 不包括在for...of循环中
// 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，
// 且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中

// 从外部注入不同值 从而调整函数行为
// next传入参数为上一次yield执行结果返回值
function* calc(x){
	let y = 2 * (yield x + 1)
	let z = yield (y/3)
	return 	(x+y+z)
}
let sum = calc(5)
console.log(sum.next())
console.log(sum.next())
console.log(sum.next())

let sum2 = calc(5)
console.log(sum2.next())
console.log(sum2.next(12))
console.log(sum2.next(13))


// 解构赋值 generator for of 实现斐波那契数列
function* fibonacci(){
	let [prev,curr] = [0,1]
	for(;;){
	   yield curr;
	   [prev, curr] = [curr, prev + curr];
	}
}
for(let n of fibonacci()){
	if ( n > 10 ) break;
	console.log(n)
}

// 迭代器和生成器 可以处理 创建大数组一次性分配内存占用太大 的问题及递归太深造成内存溢出问题
function* fib() {
	let a = 0, b = 1
	while (true) {
		yield b
		[a, b] = [b, a + b]
	}
}

let fib_iter = fib()


// 二叉树
// 由于 Generator 函数就是遍历器生成函数，
// 因此可以把 Generator 赋值给对象的Symbol.iterator 属性，从而使得该对象具有 Iterator 接口
let treeArr = [[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]];
class TreeNode {
	constructor(left,label,right){
	  this.left = left || null
	  this.label = label || null
	  this.right = right || null 
	}
}
class Tree extends TreeNode {
	constructor(arr){
	  super()
	  var obj = this.createTree(arr)
	  super.left = obj.left
	  super.label = obj.label
	  super.right = obj.right
	}
	createTree(arr){
	 if(arr.length ==1 ){ return new TreeNode(null,arr[0],null); }
	 return new TreeNode(this.createTree(arr[0]),arr[1],this.createTree(arr[2]))
	}
	// [Symbol.iterator]: function* () {}
	* [Symbol.iterator] () {
		let helloTree = 'i am a tree'
		let ht = helloTree.split(' ')
		yield* ht;
		return helloTree;
	}
	* inorder(t=this){
	if(t){
	  yield* this.inorder(t.left)
	  yield t.label
	  yield* this.inorder(t.right)
	 }
	}
}

let myTree = new Tree(treeArr)
console.log(myTree)
for(let node of myTree.inorder()){
	console.log(node)
}
for(let str of myTree){
	console.log(str)
}



//generator 绑定this 实现构造函数


function* F(){
	this.a = 666
	yield this.b = 2
	yield this.c = 3
}


// 使用 call 绑定外部对象实现 三次执行next完成F内部所有代码的运行
let generatorObj = {}
let f1 = F.call(generatorObj)
console.log('---------------')
console.log(f1.next())
console.log(f1.next())
console.log(f1.next())
console.log(generatorObj.a)
console.log(generatorObj.b)
console.log(generatorObj.c)



// 使用 call 绑定 generator函数的prototype
let f2 = F.call(F.prototype)
console.log('---------------')
console.log(f2.next())
console.log(f2.next())
console.log(f2.next())
console.log(f2.a)
console.log(f2.b)
console.log(f2.c)
console.log(F.prototype)

// 将F改为构造函数 可执行new操作
function* gen(){
	this.a = 777
	yield this.b = 111
	yield this.c = 222
}
function GF(){
	return gen.call(gen.prototype)
}
let gf = new GF()
console.log('---------------')
console.log(gf.next())
console.log(gf.next())
console.log(gf.next())
console.log(gf.a)
console.log(gf.b)
console.log(gf.c)




// Generator意义
// 实现状态机 使用generator试下你状态机可减少用来保存状态的外部变量更简洁跟安全
let ticking = true
let traditionaryClock = function(){
	if(ticking) { console.log('traditionary Tick!!!') }
	else { console.log('traditionary Tock---') }
	ticking = !ticking
}

let generatorClock = function* (){
    while(true){
	console.log('generator Tick')
	yield '------';
	console.log('generator Tock')
	yield '------';
    }
}
let clock = generatorClock()
for(let i = 0;i < 5;i++){
	clock.next()
	traditionaryClock()
}

