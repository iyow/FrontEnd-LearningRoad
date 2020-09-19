// 大文件涉及流式读取写入切片等等
// Node.js：
var fs = require('fs');
fs.writeFile("test.txt", jsonData, function (err) {
    if (err) {
        console.log(err);
    }
});

// 浏览器（webapi）：
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    // 合适时机释放 URL.revokeObjectURL(objectURL)
    a.download = fileName;
    a.click();
}
download(jsonData, 'json.txt', 'text/plain');