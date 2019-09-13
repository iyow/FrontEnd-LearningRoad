new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4
}).format(12345.6789);
// 结果是："12,345.6789"
new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
}).format(8);
new Intl.NumberFormat('zh-Hans', {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'name'
}).format(12345.6789)
// 结果是："12,345.68 人民币"
'星期' + new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(new Date().getDay());
// 结果是："星期五"