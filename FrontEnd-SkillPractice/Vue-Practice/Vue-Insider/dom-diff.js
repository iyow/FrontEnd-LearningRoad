/**
 * DOM-Diff主框架
 */

/**
 * #define定义patches补丁的类型
 */
let PatchType = {
    ChangeProps: 'ChangeProps',
    ChangeInnerText: 'ChangeInnerText',
    Replace: 'Replace'
}

function domdiff(oldTree, newTree) {
   let patches = {}; //用于记录差异的补丁包
   let globalIndex = 0; //遍历时为节点添加索引，方便打补丁时找到节点
   dfsWalk(oldTree, newTree, globalIndex, patches);//patches会以传址的形式进行递归，所以不需要返回值
   console.log(patches);
   return patches;
}

//深度优先遍历树
function dfsWalk(oldNode, newNode, index, patches) {
    let curPatch = [];
    let nextIndex = index + 1;
    if (!newNode) {
        //如果没有传入新节点则什么都不做
    }else if (newNode.tag === oldNode.tag && newNode.key === oldNode.key){
        //节点相同，开始判断属性(未写key时都是undefined，也是相等的)
        let props = diffProps(oldNode.props, newNode.props);
        if (props.length) {
            curPatch.push({type : PatchType.ChangeProps, props});
        }
        //如果有子树则遍历子树
        if (oldNode.children.length>0) {
            if (oldNode.children[0] instanceof Element) {
                //如果是子节点就递归处理
                nextIndex = diffChildren(oldNode.children, newNode.children, nextIndex, patches);
            } else{
                //否则就当做文本节点对比值
                if (newNode.children[0] !== oldNode.children[0]) {   
                    curPatch.push({type : PatchType.ChangeInnerText, value:newNode.children[0]})
                }
            }
        }
    }else{
        //节点tagName或key不同
        curPatch.push({type : PatchType.Replace, node: newNode});
    }

    //将收集的变化添加至补丁包
    if (curPatch.length) {
        if (patches[index]) {
            patches[index] = patches[index].concat(curPatch);
        }else{
            patches[index] = curPatch;
        }
    }

    //为追踪节点索引，需要将索引返回出去
    return nextIndex;
}

//对比节点属性
/**
 * 1.遍历旧序列，检查是否存在属性删除或修改
 * 2.遍历新序列，检查属性新增
 * 3.定义：type = DEL 删除
 *         type = MOD 修改
 *         type = NEW 新增
 */
function diffProps(oldProps, newProps) {

    let propPatch = [];
    //遍历旧属性检查删除和修改
    for(let prop of Object.keys(oldProps)){
        //如果是节点删除
       if (newProps[prop] === undefined) {
          propPatch.push({
              type:'DEL',
              propName:prop
          });
       }else{
         //节点存在则判断是否有变更
         if (newProps[prop] !== oldProps[prop]) {
            propPatch.push({
                type:'MOD',
                propName:prop,
                value:newProps[prop]
            });
         }
       } 
    }

    //遍历新属性检查新增属性
    for(let prop of Object.keys(newProps)){
        if (oldProps[prop] === undefined) {
            propPatch.push({
                type:'NEW',
                propName:prop,
                value:newProps[prop]
            })
        }
    }
    
    //返回属性检查的补丁包
    return propPatch;
}

/**
 * 遍历子节点
 */
function diffChildren(oldChildren,newChildren,index,patches) {
    for(let i = 0; i < oldChildren.length; i++){
        index = dfsWalk(oldChildren[i],newChildren[i],index,patches);
    }
    return index;
}




/**
 * 根据补丁包更新视图
 */

function addPatch(oldTree, patches) {
    let globalIndex = 0; //遍历时为节点添加索引，方便打补丁时找到节点
    dfsPatch(oldTree, patches, globalIndex);//patches会以传址的形式进行递归，所以不需要返回值
 }
 
 //深度遍历节点打补丁
 function dfsPatch(oldNode, patches, index) {
     let nextIndex = index + 1;
     //如果有补丁则打补丁
     if (patches[index] !== undefined) {
         //刷新当前虚拟节点对应的DOM
         changeDOM(oldNode.el,patches[index]);
     }
     //如果有自子节点且子节点是Element实例则递归遍历
     if (oldNode.children.length && oldNode.children[0] instanceof Element) {
         for(let i =0 ; i< oldNode.children.length; i++){
            nextIndex = dfsPatch(oldNode.children[i], patches, nextIndex);
         }
     }
     return nextIndex;
 }
 
 //依据补丁类型修改DOM
 function changeDOM(el, patches) {
     patches.forEach(function (patch, index) {
         switch(patch.type){
             //改变属性
             case 'ChangeProps':
                patch.props.forEach(function (prop, index) {
                    switch(prop.type){
                       case 'NEW':
                       case 'MOD':
                           el.setAttribute(prop.propName, prop.value);
                       break;
                       case 'DEL':
                           el.removeAttribute(prop.propName);
                       break;
                    }
                })
             break;
             //改变文本节点内容
             case 'ChangeInnerText':
                  el.innerHTML = patch.value;
             break;
             //替换DOM节点
             case 'Replace':
                 let newel = h(patch.node.tag, patch.node.props, patch.node.children).render(); 
                 el.parentNode.replaceChild(newel , el);
         }
     })
 }