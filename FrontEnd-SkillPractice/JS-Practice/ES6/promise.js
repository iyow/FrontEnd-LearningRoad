console.log('------1')
const promise = new Promise(function (resolve,reject){
	let istrue = true;
	let value = '1done'
	if(istrue){
	  console.log('before resolve')
	  resolve(value)
	  // return resolve(value) 后续不会执行
	  console.log('after resolve')
	} else {
	  reject('wow!出错了!')
	}	
})

promise.then((value)=>{
	console.log(value)
})
function timmerPromise(ms){
	return new Promise(function (resolve,reject){
	  console.log('befor settimeout')
	  setTimeout(resolve,ms,'2done')
	})
}

console.log('------2')
timmerPromise(0).then((value)=>{
	console.log(value)
}).catch((err)=>{ console.log(err) })
console.log('------3')

// 异步加载图片
function loadImgAsync(url){
   return new Promise((resolve,reject)=>{
	// new Image()浏览器运行
	let img = new Image();
	img.src = url;
	img.onload = function (){
		return eresolve(url)
	}
	img.onerror = function (){
		return reject(new Error(`could not load image at ${url}`))
	}
   })
}


loadImgAsync('www.baidu.com/img/bd_logo1.png?qua=high').then((url)=>{
	console.log(`加载成功${url}`)
})

// ajax
const getJSON = function (url){
	const promise = new Promise((resolve,reject)=>{
		const reqHandler = function (){
			if(this.readyState !== 4){ return }
			if(this.status === 200){
				resolve(this.response)
			} else {
				reject(new Error(this.statusText))
			}
		}
		const client = new XMLHttpRequest()
		client.open('GET',url)
		client.onreadystatechange = reqHandler
		client.responseType = 'json'
		client.sendRequestHeader('Accept','application/json')
		client.send()
	});
	return promise;
}
