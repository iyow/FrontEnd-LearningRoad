// https://astexplorer.net/ 方便查看 AST树
// @babel/types
// https://babeljs.io/docs/en/babel-types#arrowfunctionexpression
module.exports = function(babel) {
  // Babel Types模块是一个用于 AST 节点的 Lodash 式工具库
  let { types: t } = babel
    return {
      // 访问者是一个用于 AST 遍历的跨语言的模式。 
      // 简单的说它们就是一个对象，
      // 定义了用于在一个树状结构中获取具体节点的方法。
      // 遍历中时，每当在树中遇见一个 Identifier(节点) 的时候会调用 Identifier() 方法。
      // 这些调用都发生在进入节点时，不过有时候我们也可以在退出时调用访问者方法。
      // 向下遍历这棵树我们进入每个节点，向上遍历回去时我们退出每个节点。
      visitor: {
        // Identifier() { ... } 为简写 ===> 默认enter访问
        Identifier: {
          enter(path, state) { 
            console.log('----enter called') 
          },
          exit(path, state) {
            console.log("Exited!");
          }
        },
        VariableDeclaration(path) {
          const node = path.node;
          ['let', 'const'].includes(node.kind) && (node.kind = 'var');
        },
        ArrowFunctionExpression(path) {
          let { id, params, body, generator, async } = path.node;
          // 小心箭头函数我们会简写{return a+b} 为 a+b 
          if (!t.isBlockStatement(body)) {    
            const node = t.returnStatement(body);
            body = t.blockStatement([node]);
          }
          path.replaceWith(t.functionExpression(id, params, body, generator, async));
        },
        // 把同一个函数应用到多种访问节点。
        "FunctionDeclaration|MemberExpression"(path){
          console.log('FunctionDeclaration节点----------MemberExpression节点应用同一个函数')
        },
        BinaryExpression(path) {
          console.log('BinaryExpression节点')
          // 只关注使用了 === 的 BinaryExpression
          if (path.node.operator !== "===") {
            return;
          }
          // 修改节点两边的node
          // 把操作符左侧的变量名改为 sebmck
          path.node.left = t.identifier("sebmck");
          // 把操作符右侧的变量名改为 dork
          path.node.right = t.identifier("dork");
        }
      }
    };
  };