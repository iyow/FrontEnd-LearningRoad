import * as React from 'react';
// import './IndexApp.scss';
// const styles = require('./IndexApp.scss');
import Button from '@components/Button/Button';

import * as styles from './IndexApp.scss';
// styleName 使用class className 会与className合并
import './icon.css';

const Security = require('@images/security.svg');

export default class App extends React.Component<any> {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div className={styles['index-app']} styleName="index-app-title">
                    <img src={String(Security)} width="100" height="100"/>
                    {/* 下面这样引用，图片会报404错误 */}
                    {/* <img src="../../../assets/images/security.svg" alt=""/> */}
                </div>
                <h1> Hello, Webpack + React + Typescript!(^_^)</h1>
                <Button />
                <span styleName="iconfont icon-fenxiang"></span>
                <span styleName="iconfont icon-guangbo"></span>
            </div>
        )
    }
}