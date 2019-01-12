/**
 * @param path 文件路径
 * @param options 包含宽,高,质量
 * @param callback 图片压缩后执行的回调函数
 */
function canvasDataURL (path, options, callback) {
  var img = new Image()
  img.src = path
  img.onload = function () {
    var that = this
    // 默认按比例压缩
    var w = that.width
    var h = that.height
    var scale = w / h
    // 限制宽度800 防止出现压缩后图片比原图大问题
    w = options.width || (w > 800 ? 800 : w)
    h = options.height || (w / scale) // 默认等比压缩
    var quality = 0.7 // 默认图片质量为0.7
    // 生成canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 创建属性节点
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (options.quality && options.quality <= 1 && options.quality > 0) {
      quality = options.quality
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}

/**
 * @param file 文件对象
 * @param options 包含宽,高,质量
 * @param callback
 */
function photoCompress (file, options, callback) {
  var ready = new FileReader()
  // 开始读取指定的Blob对象或File对象中的内容.
  // 当读取操作完成时,readyState属性的值会成为DONE
  // 如果设置了onloadend事件处理程序,则调用之.
  // 同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.

  // readAsArrayBuffer() readAsBinaryString() readAsDataURL() readAsText()
  ready.readAsDataURL(file)
  ready.onload = function () {
    var path = this.result
    canvasDataURL(path, options, callback)
  }
}
// data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=
function convertBase64UrlToBlob (urlData) {
  var arr = urlData.split(',')
  // 获取mimeType   例如：image/jpeg
  var mime = arr[0].match(/:(.*?);/)[1]
  //通过atob把base64转化为ascll码
  var bstr = atob(arr[1])
  // 内容原始字符长度
  var n = bstr.length
  // 根据原始字符内容  分配无符号整型数组 空间 大小(8位->1字节) (每个索引下为8位无符号整数 0~(2^8) - 1)
  // （描述一个底层的二进制数据缓存区的一个类似数组(array-like)视图）
  // 用八位无符号整数来绑定 n字节 内存区域  每个变量1字节
  var u8arr = new Uint8Array(n)
  while (n--) {
    // 把ascll码转化为字节码（charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元）
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default { photoCompress, convertBase64UrlToBlob }
