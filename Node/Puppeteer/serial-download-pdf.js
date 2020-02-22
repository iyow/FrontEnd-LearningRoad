const pptr = require('puppeteer')
const pptr = require('puppeteer-core')


let sleep = function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay);
    })
}
let consoleProgress = function (currentP) {
    let p = parseInt(currentP * 100)
    console.clear()
    console.log(`【 ${'-'.repeat(p)}>${' '.repeat(100 - p)} 】`, p + '%')
}
// num传入的数字，maxln需要的最大字符长度
function PrefixInteger(num, maxln) {
    let numStr = String(num)
    let pre = '0'.repeat(maxln - numStr.length)
    return pre + numStr
    // return (Array(maxln).join(0) + num).slice(-maxln)
}

async function serialDownloadPdf(urlArr, optionsFuc = (url, index) => ({ path: `./${index}.pdf/` }), offset = 0) {
    let urls = urlArr.slice(offset)
    console.log('-----启动下载 总链接数：', urls.length)
    const brower = await pptr.launch()
    const page = await brower.newPage()
    let currentIndex = offset
    try {
        for (const url of urls) {
            let cccc = url.split('/').pop()
            console.log(`start----ccc${currentIndex}----page${cccc}`)
            // await page.goto(`https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-${pageindex}/`, {
            //     waitUntil: 'networkidle0'
            // })
            await page.goto(url)
            // 在页面执行代码
            // await page.page.evaluate(() => {
            //     let a = document.querySelector('.nav')
            //     console.log(a)
            // })
            // 修改样式
            await page.addStyleTag({ content: '.one-monokai {white-space: pre-wrap}' })
            await page.pdf(optionsFuc(url, currentIndex))
            console.log(`end--------page${cccc}`)
            currentIndex++
        }
    } catch (error) {
        console.log('-----出错了错了-----', error)
        // await sleep(1000)
        await page.waitFor(1000)
        await brower.close()
        await serialDownloadPdf(urlArr, optionsFuc, currentIndex)
    }
    console.log('--------下载结束')
}

async function main() {
    let pageindexS = 31
    let pageindexE = 31
    let pageMaxLenght = String(pageindexE).length
    let pageurl = `https://www.example.com/series/`
    let urls = Array.from({ length: pageindexE + 1 }, (a, i) => `${pageurl}${PrefixInteger(i, pageMaxLenght)}.html`)
    try {
        await serialDownloadPdf(urls, (url, index) => ({
            path: `./example/${PrefixInteger(index, pageMaxLenght)}.pdf`
        }), pageindexS)
    } catch (err) {
        console.log(err)
    }
    console.log('结束了end----------------')

}


main()