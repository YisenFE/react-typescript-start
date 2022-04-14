import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrap } from '../common/AppWrap';

const ROOT_ID = 'root2_1';

const container = document.getElementById(ROOT_ID) || document.body;
const root = ReactDOM.createRoot(container);

root.render(
    <AppWrap id={ROOT_ID}>
        <h1>Hello, world!</h1>
    </AppWrap>,
);
