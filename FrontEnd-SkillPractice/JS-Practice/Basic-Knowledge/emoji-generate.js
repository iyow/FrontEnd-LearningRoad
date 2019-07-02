// unicode 字符表情  0x1f6xx 部分
function emojiConstruct() {
    let codeArr = ['6', '0', '0']
    let emoji = []
    let data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    data.forEach(second => {
        data.forEach(third => {
            codeArr[1] = second
            codeArr[2] = third
            emoji.push(emojiInit(codeArr.join('')))
        })
    });
    data.forEach(i => {
        console.log(i)
    })
    return emoji
}

function emojiInit(code) {
    return String.fromCodePoint('0x1f' + code)
}

console.log(emojiConstruct())