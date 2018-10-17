function where(collection, source) {
    var arr = [];
    let count = 0;
    let keys = Object.keys(source);
    let len = keys.length;
    // What's in a name?
    collection.forEach((val) => {
        keys.forEach((key, index) => {
            if (val.hasOwnProperty(key) && val[key] === source[key]) {
                count++;
            }
        });
        if (count == len) {
            arr.push(Object.assign({}, val, source));
        }
        count = 0;
    });
    return arr;
}

where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
where([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 })