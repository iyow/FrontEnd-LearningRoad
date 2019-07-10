import React from "react";
import ReactDom from 'react-dom'
import WpApp from './components/WpApp'

import utils from './utils'
let a = 'hello webpack'
//   console.log `${a}`

function helloFunc() {
    console.log(a)
    utils.add(1,2)
}
helloFunc()


document.addEventListener("DOMContentLoaded",(e)=>{
    const helloEle = document.createElement('h1')
    const css = `color:tomato;`

    helloEle.style.cssText = css
    helloEle.innerHTML = 'HELLO Weppack'
    document.body.appendChild(helloEle)
    console.log(e)
})

ReactDom.render(<WpApp />,document.getElementById('reactapp-root'))