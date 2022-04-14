import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppWrap } from './AppWrap';

export function rootRender(container: Element, element: JSX.Element) {
    const root = ReactDOM.createRoot(container);
    const id = container.id;
    // root.render(<AppWrap id={id}>{element}</AppWrap>);
    root.render(React.createElement(AppWrap, { id }, element));
}
