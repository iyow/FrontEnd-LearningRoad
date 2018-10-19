// 把指定的字符串翻译成 pig latin。
// Pig Latin 把一个英文单词的第一个辅音或辅音丛（consonant cluster）移到词尾，然后加上后缀 "ay"。
// 如果单词以元音开始，你只需要在词尾添加 "way" 就可以了。

function translate(str) {
    let constant = ['a', 'e', 'i', 'o', 'u'];
    let firstConstant = [...str].findIndex((val) => {
        return constant.includes(val);
    });
    if (firstConstant !== undefined) {
        return (firstConstant ?
            str.slice(firstConstant) + str.slice(0, firstConstant) + 'ay' :
            str + 'way');
    } else {
        return '错误的单词';
    }
}

translate("consonant");
translate("eight")
translate("glove")