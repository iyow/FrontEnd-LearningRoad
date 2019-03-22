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



/**
 * @description 时间显示模式策略
 * @param {Int} time 毫秒时间戳   '--:--'为默认显示时间格式
 * @param {*} innerFormat 策略时间戳之内-时间格式
 * @param {*} outerFormat 超过策略时间戳之外-时间格式
 * @return {String} 应用当前策略后的时间格式
 */
// 以当天零点时间戳为分界
function zeroTimeStampFunc(time, innerFormat, outerFormat) {
    function zeroTimeStamp() {
        let zeroTimeStamp = new Date().setHours(0, 0, 0, 0)
        return time >= zeroTimeStamp
    }
    return timeJudge(time, innerFormat, outerFormat, zeroTimeStamp())
}
// 以当前时间24小时前为分界
function twentyFourHoursFunc(time, innerFormat, outerFormat) {
    function twentyFourHours() {
        let twentyFourHoursTimeStamp = 24 * 60 * 60 * 1000
        return (new Date().getTime() - time) > twentyFourHoursTimeStamp
    }
    return timeJudge(time, innerFormat, outerFormat, twentyFourHours())
}
function timeJudge(time, innerFormat, outerFormat, Strategy) {
    if (time === '--:--') { return time }
    return Strategy ? formatDate(innerFormat, time * 1) : formatDate(outerFormat, time * 1)
}
let DisplayTimeStrategy = {
    'zeroTimeStamp': zeroTimeStampFunc,
    'twentyFourHours': twentyFourHoursFunc
}
export const formatDisplayTime = DisplayTimeStrategy['zeroTimeStamp']