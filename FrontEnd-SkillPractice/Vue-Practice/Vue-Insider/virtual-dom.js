function h1(name, props, children) {
    return {
        name:name,
        props:props,
        children:children
    }
}
function ght(f) {
    return f('body',{className:'main'},[
        f('div',{className:'sideBar'},[
           f('ul',{className:'sideBarContainer'},[
                f('li',{className:'sideBarItem'},['sidebar-1']),
                f('li',{className:'sideBarItem'},['sidebar-2']),
                f('li',{className:'sideBarItem'},['sidebar-3']),
             ])
         ]),
        f('div',{className:'mainContent'},[
            f('div',{className:'header'},['header-zone']),
            f('div',{className:'coreContent'},['core-content']),
            f('div',{className:'footer'},['footer-zone']),
         ]),
        f('div',{className:'rightSide'},['暂未开发'])
     ]);
}
var tree = ght(h1)



function DfsTree(tree) {
    var _childrenLength;
    //执行动作
    if (typeof tree.children[0] === 'string') {
        console.log(`<${tree.name} class="${tree.props.className}">${tree.children[0]}</${tree.name}>`);
    } else {
        console.log(`<${tree.name} class="${tree.props.className}">`);
        for (var i = 0, _childrenLength = tree.children.length; i < _childrenLength; i++) {
            DfsTree(tree.children[i]);
        }
        console.log(`</${tree.name}>`);
    }
}

DfsTree(tree)





//Virtual-DOM 节点类定义
class Element{
    /**
   * @param {String} tag 'div' 标签名
   * @param {Object} props { class: 'item' } 属性集
   * @param {Array} children [ Element1, 'text'] 子元素集
   * @param {String} key option 
   */
  constructor(tag, props, children, key) {
     this.tag = tag;
     this.props = props;
     if (Array.isArray(children)) {
        this.children = children;
     } else if (typeof children === 'string'){
        this.children = null;
        this.key = children;
     }
     if (key) {this.key = key};
  }

  /**
   * 从虚拟DOM生成真实DOM
   * @return {[type]} [description]
   */
  render(){
     //生成标签
     let el = document.createElement(this.tag);
     let props = this.props;
     
     //添加属性
     for(let attr of Object.keys(props)){
        el.setAttribute(attr, props[attr]);
     }

     //处理子元素
     var children = this.children || [];

     children.forEach(function (child) {
         var childEl = (child instanceof Element)
         ? child.render()//如果子节点是元素，则递归构建
         : document.createTextNode(child);//如果是文本则生成文本节点
         el.appendChild(childEl);
     });
      
     //将DOM节点的引用挂载至对象上用于后续更新DOM
     this.el = el;
     //返回生成的真实DOM节点
     return el;
  }
}
//提供一个简写的工厂函数
function h2(tag, props, children, key) {
    return new Element(tag, props, children, key);
}

var tree = ght(h2)
//生成离线DOM
var realDOM = tree.render();
//挂载DOM
document.getElementById('app').appendChild(realDOM);
