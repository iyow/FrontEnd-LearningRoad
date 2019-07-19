self.addEventListener('message', function (e) {
    // console.log('service worker receive message', e.data);  
    let allClient = self.clients.matchAll()  // 可以过滤一层 只转发给某些client
    // waitUntil扩展了事件的生命周期。
    // 在服务工作线程中，延长事件的寿命从而阻止浏览器在事件中的异步操作完成之前终止服务工作线程。
    e.waitUntil(
        // self.clients.matchAll()获取当前注册了该 Service Worker 的所有页面，
        // 通过调用每个client（即页面）的postMessage方法，向页面发送消息。
        // 这样就把从一处（某个Tab页面）收到的消息通知给了其他页面。
        allClient.then(function (clients) {
            if (!clients || clients.length === 0) {
                return;
            }
            clients.forEach(function (client) {
                client.postMessage(e.data);
            });
        })
    );
});