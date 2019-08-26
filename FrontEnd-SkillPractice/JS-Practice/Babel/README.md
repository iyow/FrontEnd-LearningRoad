## Babel

### babel包结构

#### 核心包
- babel‑core：babel转译器本身，提供了babel的转译API，如babel.transform等，用于对代码进行转译。像webpack的babel‑loader
就是调用这些API来完成转译过程的。
- babylon：js的词法解析器
- babel‑traverse：用于对AST（抽象语法树，想了解的请自行查询编译原理）的遍历，主要给plugin用
- babel‑generator：根据AST生成代码
#### 功能包
- babel‑types：用于检验、构建和改变AST树的节点
- babel‑template：辅助函数，用于从字符串形式的代码来构建AST树节点
- babel‑helpers：一系列预制的babel‑template函数，用于提供给一些plugins使用
- babel‑code‑frames：用于生成错误信息，打印出错误点源代码帧以及指出出错位置
- babel‑plugin‑xxx：babel转译过程中使用到的插件，其中babel‑plugin‑transform‑xxx是transform步骤使用的
- babel‑preset‑xxx：transform阶段使用到的一系列的plugin
- babel‑polyfill：JS标准新增的原生对象和API的shim，实现上仅仅是 **core‑j** 和 **regenerator‑runtime** 两个包的封装
- babel‑runtime：功能类似babel‑polyfill，一般用于library或plugin中，因为它不会污染全局作用域
#### 工具包
- babel‑cli：babel的命令行工具，通过命令行对js代码进行转译
- babel‑register：通过绑定node.js的require来自动转译require引用的js代码文件

### babel基本工作原理

#### 概念

babel是一个转译器，感觉相对于编译器compiler，叫转译器transpiler更准确，因为它只是把同种语言的高版本规则翻译成低版本规则，而不像编译器那样，输出的是另一种更低级的语言代码。但是和编译器类似，babel的转译过程也分为三个阶段：parsing、transforming、generating。
#### 具体过程

> 以ES代码转译为ES代码为例

ES代码输入 ==》 babylon进行解析 ==》 得到AST
==》 plugin用babel‑traverse对AST树进行遍历转译 ==》 得到新的AST树
==》 用babel‑generator通过AST树生成ES代码

#### 注意

babel只是转译新标准引入的句法（syntax），比如ES的箭头函数转译成ES的函数；而新标准引入的新的原
生对象，部分原生对象新增的原型方法，新增的API等（如Proxy、Set等），这些babel是不会转译的。需要用户自行引入polyfill来解决（babel-polyfill）