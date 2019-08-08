class Invoker {
    constructor() {
        console.log('Invoker Class created');
        this.command = undefined
        this.historyCommand = []
        this.doneCommandList = []
    }

    storeCommand(command) {
        this.command = command
        console.log('Invoker.storeCommand invoked');
        return this
    }
    runCommand(){
        this.historyCommand.push({command,'op':'execute'});
        this.doneCommandList.push(command)
        this.command.execute()
    }
    cancelCommand(){
        this.historyCommand.push({command,'op':'undo'});
        let undoCommand = this.doneCommandList.pop(command);
        undoCommand.undo()
        // this.command.undo()
    }
    runAgain(){
        this.historyCommand.forEach(({command,op})=>command[op]())
    }
}

class Command {
    constructor() {
        console.log('Command Class created');
    }

    execute() {
        console.log('Command.execute invoked');
    }
}

class ConcreteCommand extends Command {
    constructor(receiver, state) {
        super();
        this.receiver = receiver;
        console.log('ConcreteCommand Class created');
    }

    execute() {
        console.log('ConcreteCommand.execute invoked');
        this.receiver.action();
    }
    undo() {
        console.log('ConcreteCommand.undo invoked');
        this.receiver.undoAction();
    }
}

class Receiver {
    constructor() {
        console.log('Receiver Class created');
    }

    action() {
        console.log('Receiver.action invoked');
    }
    undoAction(){
        console.log('Receiver.undoAction invoked');
    }
}

// 没有接收者的命令模式，退化到和策略模式非常相近，但是两种模式意图不同。
// 策略模式指向的问题域更小，所有策略对象的目标总是一致的，它们只是达到这个目标的不同手段，
// 而智能命令模式指向的问题域更广，command对象解决的目标更具发散性。命令模式还可以完成撤销、排队等功能。
var receiver = new Receiver();
var command = new ConcreteCommand(receiver);

var invoker = new Invoker();
invoker.storeCommand(command);
invoker.runCommand();
invoker.cancelCommand();