// 将字符串中的字符 &、<、>、" （双引号）, 以及 ' （单引号）转换为它们对应的 HTML 实体。

function convert1(str) {
    let charEntities = {
        '&': '&amp;',
        '>': '&gt;',
        '<': '&lt;',
        '"': '&quot;',
        '\'': '&apos;'
    };
    let reg = /([&|>|<|"|'])/g;

    let result = str.replace(reg, function (match, p1, offset, str) {
        console.log('match---', match);
        console.log('p1---', p1);
        console.log('offset---', offset);
        console.log('str---', str);
        return charEntities[p1];
    });
    console.log('str=====', str)
    console.log('result=====', result)
    return result;
}
function convert(str) {
    let reg = /(&)|(>)|(<)|(")|(')/g;
    let result = str.replace(reg, function (match, p1, p2, p3, p4, p5, offset, str) {
        // console.log('match---', match);// console.log('p1---', p1);
        // console.log('p2---', p2);// console.log('p3---', p3);
        // console.log('p4---', p4);// console.log('p5---', p5);
        // console.log('offset---', offset);// console.log('str---', str);
        let p = p1 || p2 || p3 || p4 || p5;
        switch (p) {
            case '&':
                return '&amp;';
            case '>':
                return '&gt;';
            case '<':
                return '&lt;';
            case '"':
                return '&amp;';
            case '\'':
                return '&apos;';
        }
    });
    console.log('str=====', str)
    console.log('result=====', result)
    return result;
}

convert("Dolce & G<>abb&ana'");
convert('Stuff in "quotation marks"')