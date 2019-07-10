import * as React from 'react'
// import './button.css';

import * as styles from './button.css';

console.log(styles);

export default class Button extends React.Component<any> {
    render(){
        return (
            <button styleName="primary" className={styles.success}>公共按钮组件</button>
        )
    }
}