// async 为Gnerator函数的语法糖
// 解决异步回调地狱问题
// 即 下一次异步操作需要上一个异步操作的回调结果(即整个流程是同步的)
// 即 按顺序完成异步操作
async function getTitle(url){
	let response = await fetch(url)
	let html = await response.text()
	return html.match(/<title>([\s\S]+)<\/title>/i)[1]
}

getTitle('https://tc39.github.io/ecma262/').then(console.log)


// 多个 await命令后面的异步操作如果不存在继发关系最好让他们同时触发
// 耗时
let foo = await getFoo();
let bar = await getBar();
// 修改为
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
