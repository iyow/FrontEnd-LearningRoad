// 零宽字符
// 零宽度字符是一些不可见的，不可打印的字符。它们存在于页面中主要用于调整字符的显示格式，
// 下面就是一些常见的零宽度字符及它们的unicode码和原本用途：

// 零宽度空格符 (zero-width space) U+200B : 用于较长单词的换行分隔
// 零宽度断字符 (zero-width non-joiner) U+200C : 用于阿拉伯文，德文，印度语系等文字中，阻止会发生连字的字符间的连字效果
// 零宽度连字符 (zero-width joiner) U+200D : 用于阿拉伯文与印度语系等文字中，使不会发生连字的字符间产生连字效果
// 左至右符 (left-to-right mark) U+200E : 用于在混合文字方向的多种语言文本中
// （例：混合左至右书写的英语与右至左书写的希伯来语），规定排版文字书写方向为左至右
// 右至左符 (right-to-left mark) U+200F : 用于在混合文字方向的多种语言文本中，规定排版文字书写方向为右至左
// 零宽度非断空格符 (zero width no-break space) U+FEFF : 用于阻止特定位置的换行分隔

// 控制字符
// 另一种 有特殊作用的---控制字符：  是出现于特定的信息文本中，表示某一控制功能的字符
// (钉钉网页版@某人的功能就是用控制字符做的)

// 传递隐密信息
// 实现原理
// 具体步骤和实现原理如下正向逆向Fingerprint过程所示，
// 其用户名字符串会被转换为二进制形式，然后这些二进制形式会被转换为一系列用二进制位表示的零宽度字符，
// 零宽度字符会被隐蔽地插入到文本内容中。如果这种插入了零宽度字符的文本内容被复制粘贴到网络其它论坛中后，
// 通过提取其中隐蔽的零宽度字符就能标识出复制了这些信息的登录用户身份。


class ZeroWidthChar {
    // static ZWSpace = String.fromCodePoint(0x200B)
    // static ZWNonJoiner = String.fromCodePoint(0x200C)
    // static ZWJoiner = String.fromCodePoint(0x200D)
    // static LeftToRightMark = String.fromCodePoint(0x200E)
    // static RightToLeftMark = String.fromCodePoint(0x200F)
    // static ZWNoBreakSpace = String.fromCodePoint(0xFEFF)
    constructor() { }

    // 加密
    static encode(toEncodeText) {
        let text = toEncodeText
        // 此处小技巧 Array.from 能让我们正确读取宽度为2的Unicode字符，例：😀
        // split('')会把 😀 分为两个字符
        let textArray = Array.from(text)
        // 用codePointAt读取所有字符的十进制Unicode码
        // 用toString将十进制Unicode码转化成二进制（除了二进制，我们也可以使用更大的进制来缩短加密后的信息长度，以此提升效率）
        let binarify = textArray.map(c => c.codePointAt(0).toString(2));

        // 此时binarify中的值是 ["110001", "110010", "110011", "11111011000000000"]，
        // 下一步我们需要将"1"，"0"和分隔符映射到响应的零宽度字符上去

        // 我们用零宽度连字符来代表1，零宽度断字符来代表0，零宽度空格符来代表分隔符
        // 下面的''看上去像是空字符串，但其实都是长度为1，包含零宽度字符的字符串
        // 通过制定代码点序列创建字符串
        // String.fromCharCode(0b110001);2进制代码点   1
        // String.fromCharCode(0o61);8进制代码点       1
        // String.fromCodePoint(0x2F804);16进制代码点  // "\uD87E\uDC04" 表示字符 你
        // String.fromCodePoint(194564);10进制代码点   // "\uD87E\uDC04" 表示字符 你
        // String.fromCodePoint(0x200B); 获得零宽度空格符
        let encoded = binarify
            .map(c => Array.from(c).map(b => b === '1' ? ZeroWidthChar.ZWJoiner : ZeroWidthChar.ZWNonJoiner).join(''))
            .join(ZeroWidthChar.ZWSpace);
        // 此时encoded中包含的就是一串不可见的加密文本了
        return encoded
    }

    // 解密
    static decode(encodedText) {
        // 接着上面的encoded
        // 用分隔符（零宽度空格符）提取加密文本中的字符
        const split = encodedText.split(ZeroWidthChar.ZWSpace);

        // 将文本转回成二进制数组
        const binary = split
            .map(c => Array.from(c).map(z => z === ZeroWidthChar.ZWJoiner ? '1' : '0').join(''));

        // 此时binary中的值再次回到开始的 ["110001", "110010", "110011", "11111011000000000"]

        // 最后一部只需要将二进制文本转回十进制，再使用 String.fromCodePoint 就可以得到原文本了
        const decoded = binary.map(b => String.fromCodePoint(parseInt(b, 2))).join('');
        // 此时decoded中的值即是 "123😀"
        return decoded
    }
}
ZeroWidthChar.ZWSpace = String.fromCodePoint(0x200B)
ZeroWidthChar.ZWNonJoiner = String.fromCodePoint(0x200C)
ZeroWidthChar.ZWJoiner = String.fromCodePoint(0x200D)
ZeroWidthChar.LeftToRightMark = String.fromCodePoint(0x200E)
ZeroWidthChar.RightToLeftMark = String.fromCodePoint(0x200F)
ZeroWidthChar.ZWNoBreakSpace = String.fromCodePoint(0xFEFF)

let watermark = '@author yaokunpeng_iyow <yaokunpeng@example.com>'
let encodeText = ZeroWidthChar.encode('123😀')
let dencodeText = ZeroWidthChar.decode(encodeText)
let watermarkEncoded = ZeroWidthChar.encode(watermark)
let watermarkDecoded = ZeroWidthChar.decode(watermarkEncoded)

console.log(encodeText)
console.log(dencodeText)
console.log(watermarkEncoded)
console.log(watermarkDecoded)

// String.fromCharCode()方法可以实现把码点转成字符打印,
// 比如String.fromCharCode(0x0061) ，控制台会输出a，
// 但是fromCharCode只能对不大于0xFFFF的码点才有效，
// 如果我们要打印一个emoji表情笑脸😁，首先我们知道这个笑脸的Unicode编码是1f601，
// 但是很明显超出了FFFF，如果使用fromCharCode并不会输出我们想要的笑脸
// 你会发现使用fromCharCode输出0x1f601和输出0xf601结果是一样的，
// 这是因为1f601超出了ffff，所以输出结果把1f601中的高位1截断了，实际输出的还是f601。
// 所以为了解决不能大于0xffff的问题，es6出现了fromCodePoint。返回由指定的UTF-16代码单元序列创建的字符串。
