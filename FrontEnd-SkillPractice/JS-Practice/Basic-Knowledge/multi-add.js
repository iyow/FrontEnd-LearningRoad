function add(a){
    function sum (b){
        a = a + b
        return sum
    }
    sum.toString = function(){
        return a 
    }
    return sum
}


console.log(add(1))
console.log(add(1)(2))
add(1)(2)(3)
add(1)(2)(3)(4)