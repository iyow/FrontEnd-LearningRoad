// 从传递进来的字母序列中找到缺失的字母并返回它。
// 如果所有字母都在序列中，返回 undefined。

function fearNotLetter(str) {
    let strArr = [...str];
    let codePointer = strArr[0].charCodeAt();

    let sign = strArr.every((val) => {
        return (val.charCodeAt() === codePointer) && codePointer++;
    });
    return sign ? undefined : String.fromCharCode(codePointer);

    // let sign = strArr.find((val) => {
    //     return val.charCodeAt() !== codePointer++;
    // });
    // return sign ? String.fromCharCode(--codePointer) : sign;
}

fearNotLetter("abce");