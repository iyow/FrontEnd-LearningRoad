// 文件拖入上传获取到event之后
// 递归获取文件夹中文件方法

fileonDropHandle = function (e, callback) {
  function traverseFileTree(item, path) {
    path = path || ''
    if (item.isFile) {
      // Get file
      item.file(function (file) {
        callback(file)
        console.log('File:', path + file.name)
      })
    } else if (item.isDirectory) {
      // Get folder contents
      var dirReader = item.createReader()
      dirReader.readEntries(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + '/')
        }
      })
    }
  }
  for (var i = 0; i < e.dataTransfer.items.length; i++) {
    // webkitGetAsEntry is where the magic happens
    var item = e.dataTransfer.items[i].webkitGetAsEntry()
    console.log(item)
    if (item) {
      traverseFileTree(item)
    }
  }
}