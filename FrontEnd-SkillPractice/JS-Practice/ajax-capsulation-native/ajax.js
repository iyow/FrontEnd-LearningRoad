function ajax(data) {
    // data = {data:"",dataType:"xml/json",type:"get/post",url:"",asyn:"true/false",success:fucntion(){},failure:function(){}}

    // data.data的格式 
    //对象格式 data = {username:"ykp",password:456}  需要解析
    //  data = "username:'ykp'&password=456"  不需要解析下面使用此格式

    //第一步，创建 xhr对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //第二步，准备发送前的一些配置参数
    var type = data.type == 'get' ? 'get' : 'post';
    var url = "";
    if (data.url) {
        url = data.url;
        if (type == 'get') {    
            //由于浏览器会缓存导致参数不变的情况会请求缓存数据 &_t参数保持每次传入的参数都是不一样的
            url += "?" + data.data + "&_t=" + new Date().getTime();
        }
    }
    var flag = data.asyn == 'true' ? 'true' : 'false';
    xhr.open(type, url, flag);

    //第三步：执行发送的动作
    if (type == 'get') {
        xhr.send(null);
    } else if (type == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data.data);
    }

    //第四步：指定回调函数
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof data.success == 'function') {
                    //传入ajax请求返回的内容
                    var d = data.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
                    data.success(d);
                }
            } else {
                if (typeof data.failure == 'function') {
                    data.failure();
                }
            }
        }
    }

}