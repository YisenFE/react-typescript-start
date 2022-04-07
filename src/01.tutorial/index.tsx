import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';

// ===================

export function renderDOM(root: Element) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        root
    );
}

export default renderDOM;

