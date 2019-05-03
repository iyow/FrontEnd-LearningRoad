// cookie设置语法：
// document.cookie = "cookieName=mader; expires=Fri, 31 Dec 2017 15:59:59 GMT; path=/mydir; domain=cnblogs.com; max-age=3600; secure=true";

//      cookieName=mader ：name=value，cookie的名称和值
//      expires=Fri, 31 Dec 2017 15:59:59 GMT： expires，cookie过期的日期，如果没有定义，cookie会在对话结束时过期。日期格式为 new Date().toUTCString()
//      path=/mydir: path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。
//      domain=cnblogs.com： 指定域(例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。
//      max-age=3600： 文档被查看后cookie过期时间，单位为秒
//      secure=true： cookie只会被https传输 ，即加密的https链接传输

class Cookie {
    constructor() { }
    setCookie(key, value, bufferTime = 360 * 24 * 60 * 60 * 1000) {
        let dateTmp = new Date()
        let expiresTime = dateTmp.getTime() + bufferTime
        dateTmp.setTime(expiresTime)
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${dateTmp.toUTCString()}`
    }
    getCookie(key) {
        let cookieReg = `(^| )${key}=([^;]*)(;|$)`
        var arr = document.cookie.match(new RegExp(cookieReg));
        let value = arr != null ? decodeURIComponent(arr[2]) : null
        return value
    }
    delCookie(key) {
        setCookie(key, '', -1);
    }
    getAllCookie() {
        let cookie = document.cookie
        if (!cookie) { return null }
        let cookieParseString = ''
        let cookieReg = /(^| )([^=]+)=([^;]*)(;|$)/g
        cookie.replace(cookieReg, (match, p1, p2, p3, p4) => {
            cookieParseString += `"${p2}":"${decodeURIComponent(p3)}",`
        })
        let cookieObj = JSON.parse(`{${cookieParseString.slice(0, -1)}}`)
        return cookieObj
    }
}
export default Cookie