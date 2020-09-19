var simplifyPath = function (path) {
    const arr = path.split('/')
    let stack = []
    const len = arr.length

    for (let index = 0; index < len; index++) {
        const element = arr[index];
        if (element === "" || element === ".") {
            continue;
        }

        if (element === "..") {
            stack.pop();
        } else {
            stack.push(element);
        }
    }
    return "/" + stack.join('/')
}