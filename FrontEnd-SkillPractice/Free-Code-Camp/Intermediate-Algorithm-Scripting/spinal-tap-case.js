// 将字符串转换为 spinal case。Spinal case 是 all-lowercase-words-joined-by-dashes 这种形式的，
// 也就是以连字符连接所有小写单词。

function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    let result = str.replace(/([A-Za-z])([a-z]+)([^A-Za-z])*/g, function (match, p1, p2, p3, offset) {
        console.log('match---', match)
        console.log('p1---', p1)
        console.log('p2---', p2)
        console.log('p3---', p3)
        console.log('offset---', offset)
        return offset ? `-${p1 + p2}` : p1 + p2;
    });
    console.log('===', result);
    return result.toLowerCase();
}

spinalCase("The_Andy_Griffith_Show")
spinalCase("thisIsSpinalTap")
spinalCase('This Is Spinal Tap');
spinalCase("Teletubbies say Eh-oh")
