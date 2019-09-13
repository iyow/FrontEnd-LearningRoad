let rtf = new Intl.RelativeTimeFormat('zh');
// -1表示前一天
rtf.format(-1, 'day');
// 结果是："1天前"
// 1表示往后一天
rtf.format(1, 'day');
// 结果是："1天后"
// x天前，x天后(包含0)


let rtfAuto = new Intl.RelativeTimeFormat('zh', {
    numeric: 'auto'
});

rtfAuto.format(-1, 'day');
// 结果是："昨天"
rtfAuto.format(1, 'day');
// 结果是："明天"
// x天前，前天，昨天，今天，明天，后天，x天后