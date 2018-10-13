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
// return 语句的返回值 不包括在for...of循环中
for(let f of flatAll(array)){
	console.log(f)	
}
for(let f of iterTree(array)){
	console.log(f)
}

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


// 解构赋值 generator for 0f 实现斐波那契数列
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



// 二叉树例子
let treeArr = [[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]];
class TreeNode {
	constructor(left,label,right){
	  this.left = left
	  this.label = label
	  this.right = right
	}
}
class Tree {
	constructor(arr){
	  let obj = this.createTree(arr)
	  this.left = obj.left
	  this.label = obj.label
	  this.right = obj.right
	}
	createTree(arr){
	 if(arr.length ==1 ){ return new TreeNode(null,arr[0],null); }
	 return new TreeNode(this.createTree(arr[0]),arr[1],this.createTree(arr[2]))
	}
	
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
