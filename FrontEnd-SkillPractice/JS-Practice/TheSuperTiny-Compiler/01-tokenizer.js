// 输入代码串 进行分词标记 得到token数组
function tokenizer(input) {
    let current = 0;
    let tokens = [];
    const LexREGEX = {
        PAREN: /\(|\)/,
        WHITESPACE: /\s/,
        NUMBER: /[0-9]/,
        STRING: /"/,
        // LETTERS
        NAME: /[a-z]/i
    };

    tokens.add = function (type, value) {
        this.push({ type, value });
    }
    tokens.OP = (tokens, key, char, index) => {
        let [current, value] = LexREGEX[key].op(input, char, index);
        value !== undefined && tokens.add(key.toLocaleLowerCase(), value);
        return current
    }

    LexREGEX.PAREN.op = (input, char, index) => {
        index++;
        return [index, char];
    }
    LexREGEX.WHITESPACE.op = (input, char, index) => {
        index++;
        return [index];
    }
    LexREGEX.NUMBER.op = LexREGEX.NAME.op = function (input, char, index) {
        let value = '';
        do {
            value += char;
            char = input[++index];
        } while (this.test(char));
        return [index, value];
    }
    LexREGEX.STRING.op = (input, char, index) => {
        let value = '';
        char = input[++current];
        while (!LexREGEX.STRING.test(char)) {
            value += char;
            char = input[++index];
        }
        index++;
        // char = input[++index];
        return [index, value];
    }
    // 逐字符扫描
    while (current < input.length) {
        let char = input[current];

        // 书写优化
        let lexemes = Object.keys(LexREGEX)
        let lexemesKey = lexemes.find(x => LexREGEX[x].test(char));
        if (lexemesKey) {
            current = tokens.OP(tokens, lexemesKey, char, current);
            continue;
        }

        // 原始版本
        // if (LexREGEX.PAREN.test(char)) {
        //     tokens.add('paren', char);
        //     current++;
        //     continue;
        // }
        // if (LexREGEX.WHITESPACE.test(char)) {
        //     current++;
        //     continue;
        // }
        // if (LexREGEX.NUMBER.test(char)) {
        //     let value = '';
        //     while (LexREGEX.NUMBER.test(char)) {
        //         value += char;
        //         current++;
        //         char = input[current];
        //     }
        //     tokens.add('number', value);
        //     continue;
        // }

        // if (LexREGEX.STRING.test(char)) {
        //     let value = '';
        //     char = input[++current];
        //     while (!LexREGEX.STRING.test(char)) {
        //         value += char;
        //         char = input[++current];
        //     }
        //     char = input[++current];
        //     tokens.add('string', value);
        //     continue;
        // }
        // if (LexREGEX.NAME.test(char)) {
        //     let value = '';
        //     do {
        //         value += char;
        //         char = input[++current];
        //     } while (LexREGEX.NAME.test(char));
        //     tokens.add('name', value);

        //     continue;
        // }
        throw new TypeError('Sorry,I dont know what this character is: ' + char);
    }
    return [...tokens];
}
// console.log(tokenizer('(add 2 (subtract 4 2))'))
// export default tokenizer
module.exports = tokenizer