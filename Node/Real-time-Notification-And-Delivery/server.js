const http = require('http');
const urlLib = require('url');

function sleep(numberMillis) {
    //记录当前时间
    let now = new Date();
    //设置未来的某个时间
    let exitTime = now.getTime() + numberMillis;

    while (true) {
        //获取当前时间
        now = new Date();
        //检查是否到了设置好的未来时间
        if (now.getTime() > exitTime)
            return;
    }
}

function sendData(title, res) {
    let randomNum = Math.floor(10 * Math.random());
    res.end(title + new Date().toLocaleString());
}


let PathStage = {
    '/longpolling': (res) => {
        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        sleep(3000)
        sendData('long-----polling------', res)
    },
    '/shortpolling': (res) => {
        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        sendData('short----polling------', res)
    },
    '/httpstream': (res) => {
        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST',
            'Content-Type': 'multipart/mixed'
        });
        setInterval(function () {
            res.write('httpStram----polling------');
        }, 3000);
    },
    '/iframestream': (res) => {
        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST',
            'Content-Type': 'text/html'
        });
        let timer = setInterval(function () {
                // 我们不能直接在返回的script中去调用irame parent的process方法，而是应该使用HTML5 XDM(跨文档消息传递)来传递信息，不然会被浏览器阻止的:
                let randomNum = Math.floor(10000 * Math.random());
                let insertScript = `<script type="text/javascript">parent.postMessage("data:${randomNum.toString()}","*")</script>`
                res.write(insertScript);
            },
            2000);
    },
    '/ssepush': (res) => {
        let count = 0
        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST',
            'Content-Type': 'text/event-stream'
        });
        setInterval(() => {
            res.write("id :" + count++ + '\n');
            res.write("data: " + new Date().toLocaleDateString() + ' ' + count + '\n\n');
        }, 2000);
        setInterval(() => {
            res.write('event: customSSEMessage\n'); // 事件类型
            res.write(`id: ${+new Date()}\n`); // 消息 ID
            res.write('data: 7\n'); // 消息数据
            res.write('retry: 10000\n'); // 重连时间
            res.write('\n\n'); // 消息结束
        }, 3000);
    }
}
http.createServer(function (req, res) {
    let parms = urlLib.parse(req.url, true);
    let router = PathStage[parms.pathname]
    console.log(router)
    if (router) {
        router(res)
    }
}).listen(8088);

console.log('server on 8088');