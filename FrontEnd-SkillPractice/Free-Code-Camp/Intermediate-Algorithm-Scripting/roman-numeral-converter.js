function convert(num) {
    let romanStr = '';
    let ones = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    let tens = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
    let hundreds = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
    let roman = new Map([[1, ones], [2, tens], [3, hundreds], [4, 'M']]);
    let numArr = [...num.toString()];
    let len = numArr.length;
    numArr.forEach((val) => {
        if (len <= 3 && ((val - 1) >= 0)) {
            romanStr = romanStr + roman.get(len)[val - 1];
        } else {
            romanStr = romanStr + roman.get(4).repeat(val);
        }
        len--;
    });
    return romanStr;
}

convert(36);
convert(1000)