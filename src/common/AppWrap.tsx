import React from 'react';

type Props = {
    children?: React.ReactNode;
    id: string;
};
export function AppWrap({ children, id }: Props) {
    return (
        <React.Fragment>
            <React.StrictMode>
                <span className="chapter-tip">{id}</span>
                {children}
            </React.StrictMode>
        </React.Fragment>
    );
}
