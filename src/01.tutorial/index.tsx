import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';

import App from './App';

// ===================

const container = document.getElementById('root1') || document.body;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    container,
);
