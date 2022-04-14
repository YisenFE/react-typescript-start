/**
 * @file 元素渲染
 * https://zh-hans.reactjs.org/docs/rendering-elements.html
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrap } from '../common/AppWrap';

const ROOT_ID = 'root2_3';

const container = document.getElementById(ROOT_ID) || document.body;
const root = ReactDOM.createRoot(container);

function tick() {
    const element = (
        <React.Fragment>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </React.Fragment>
    );
    // React 只更新它需要更新的部分
    root.render(<AppWrap id={ROOT_ID}>{element}</AppWrap>);
}

setInterval(tick, 1000);
