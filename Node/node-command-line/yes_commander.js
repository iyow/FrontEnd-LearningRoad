const program = require('commander')
const inquirer = require('inquirer')

const questions = [
	{
	   type:'input',
	   name:'who',
	   message:'please input your name'},
	{
	   type:'list',
	   name:'sex',
	   choices:['male','famale','neutral'],
	   message:'your gender?'},
	{
	   type:'checkbox',
	   name:'favorite',
	   choices:['vegetable salad','meat','shit'],
	   defualt:'1',
	   message:'order an food you favorite',
	   }]
program
.version('0.0.1')
.option('-l, --list [list]','list all process argv')
.parse(process.argv)


console.log(program.list)

let info = [{name:'李雷',profession:'我是砖家'},{name:'韩梅梅',profession:'我是瓦骗'}];
let answers = []
inquirer.prompt(questions).then((answer)=>{
	console.log(answer)
	answers.push(answer)
	console.table(answers)})

// console.table(info)
// console.table(answers)
