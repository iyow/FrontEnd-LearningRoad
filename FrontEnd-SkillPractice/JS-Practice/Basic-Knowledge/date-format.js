/**
 * @description 时间格式化函数
 * @param {String} type 日期格式化类型，例如YYYY:MM:DD,MM-DD,hh:mm
 * @param {[String|Number]} time 可选(默认当前时间)，毫秒时间戳
 * @return {String} 格式化后时间
 */
function formatDate(type, time = new Date()) {
    let date = new Date(time)
    return type
        .replace('YYYY', date.getFullYear())
        .replace('MM', ('00' + (date.getMonth() + 1)).slice(-2))
        .replace('DD', ('00' + date.getDate()).slice(-2))
        .replace('hh', ('00' + date.getHours()).slice(-2))
        .replace('mm', ('00' + date.getMinutes()).slice(-2))
        .replace('ss', ('00' + date.getSeconds()).slice(-2))
        .replace('xxx', ('000' + date.getMilliseconds()).slice(-3))
}