// Functor(函子)
// Definition：adheres to two rules:（遵循两个规则）

// Preserves identity（保持一致，保值）
// object.map(x => x) ≍ object

// Composable（可组合）(f, g are arbitrary functions)（f，g是任意函数）
// object.map(compose(f, g)) ≍ object.map(g).map(f)

// A common functor in JavaScript is Array since it abides to the two functor rules:
// 在JavaScript中Array就是一种常见的函子，因为它遵循函子规则

// rule1
[1, 2, 3].map(x => x) // = [1, 2, 3]

// rule2
const f = x => x + 1
const g = x => x * 2
;[1, 2, 3].map(x => f(g(x))) // = [3, 5, 7]
;[1, 2, 3].map(g).map(f)     // = [3, 5, 7]
