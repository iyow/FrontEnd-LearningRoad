//  判断数据的类型
const DataType = ['Object', 'Function', 'String', 'Boolean', 'Array', 'Number']
const Type = {};

for (let i = 0, t; t = DataType[i]; i++) {
    Type['is' + t] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + t + ']';
    }
};

export default Type