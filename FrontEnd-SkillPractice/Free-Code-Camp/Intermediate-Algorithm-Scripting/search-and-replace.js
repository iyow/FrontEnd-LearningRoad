function isUpper(str) {
    let tmp = str.slice(0, 1);
    return tmp === tmp.toUpperCase();
}
function toUpper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
function myReplace(str, before, after) {
    if (isUpper(before)) {
        after = toUpper(after);
    }
    str = str.replace(before, after);
    return str;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
myReplace("He is Sleeping on the couch", "Sleeping", "sitting")