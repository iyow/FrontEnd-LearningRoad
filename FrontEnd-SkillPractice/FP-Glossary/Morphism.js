// Morphism(态射)
// start---百科---
// 数学上，态射是两个数学结构之间保持结构的一种过程抽象。
// 最常见的这种过程的例子是在某种意义上保持结构的函数或映射。
// 例如，在集合论中，态射就是函数；
// 在群论中，它们是群同态；
// 而在拓扑学中，它们是连续函数；
// 在泛代数（universal algebra）的范围，态射通常就是同态。
// ---百科---end

// A transformation function.(转换功能。)

// Endomorphism(同态)
// A function where the input type is the same as the output.(输入类型与输出类型相同的函数。)

// uppercase :: String -> String
const uppercase = (str) => str.toUpperCase()
// decrement :: Number -> Number
const decrement = (x) => x - 1


// Isomorphism(同构)
// A pair of transformations between 2 types of objects that is structural in nature and no data is lost.
// 两种类型的对象之间的一对转换,(且该变换)本质上(只是)是结构性的，没有数据丢失。
// For example, 2D coordinates could be stored as an array [2,3] or object {x: 2, y: 3}.
// 例如，2D坐标可以存储为数组[2,3]或对象{x：2，y：3}。
// Providing functions to convert in both directions makes them isomorphic.

const pairToCoords = (pair) => ({x: pair[0], y: pair[1]})
const coordsToPair = (coords) => [coords.x, coords.y]

coordsToPair(pairToCoords([1, 2])) // [1, 2]
pairToCoords(coordsToPair({x: 1, y: 2})) // {x: 1, y: 2}