// Lift (提升)
// Lifting is when you take a value and put it into an object like a functor. 
// If you lift a function into an Applicative Functor 
// then you can make it work on values that are also in that functor.

// Some implementations have a function called lift, or liftA2 to make it easier to run functions on functors.


const liftA2 = (f) => (a, b) => a.map(f).ap(b) // note it's `ap` and not `map`.
// ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。请查看ap函子

const mult = a => b => a * b

const liftedMult = liftA2(mult) // this function now works on functors like array

liftedMult([1, 2], [3]) // [3, 6]
// first: [1,2].map(mutl)
// seconde: [b=>1*b,b=>2*b].ap(b)      go with map [b=>1*b,b=>2*b].map(f=>b.map(f)).flat()

liftA2(a => b => a + b)([1, 2], [3, 4]) // [4, 5, 5, 6]

// Lifting a one-argument function and applying it does the same thing as map.
const increment = (x) => x + 1

lift(increment)([2]) // [3]
;[2].map(increment) // [3]