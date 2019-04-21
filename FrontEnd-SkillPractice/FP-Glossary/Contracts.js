// Contracts(契约)
// A contract specifies the obligations and guarantees of the behavior from a function or expression at runtime.
// This acts as a set of rules that are expected from the input and output of a function or expression,
// and errors are generally reported whenever a contract is violated.
// 契约在运行时指定函数或表达式的行为。
// 它充当一组规则(从函数或表达式的输入到输出预期的规则)，并且通常在违反契约时报告错误。
// Define our contract : int -> int'
const contract = (input) => {
  if (typeof input === 'number') return true
  throw new Error('Contract violated: expected int -> int')
}

const addOne = (num) => contract(num) && num + 1

addOne(2) // 3
addOne('some string') // Contract violated: expected int -> int