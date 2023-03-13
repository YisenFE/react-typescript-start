/**
 * @file 代码分割
 * https://zh-hans.reactjs.org/docs/code-splitting.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';
import './style/2.CodeSplitting.scss';

/** React.lazy */
function __react_lazy() {
    const OtherComponent = React.lazy(
        () =>
            new Promise<{ default: React.FC<{}> }>(res => {
                setTimeout(() => {
                    res(import('./2.OtherComponent'));
                }, 2000);
            }),
    );
    function MyComponent() {
        return (
            <div>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <OtherComponent />
                </React.Suspense>
            </div>
        );
    }
    rootRender(document.getElementById('root3_2_1') || document.body, <MyComponent />);
}
__react_lazy();

/** 避免兜底 */
function __avoiding_fallbacks() {
    type TabType = 'photos' | 'comments';
    type TabProps = {
        onTabSelect: (tab: TabType) => unknown;
    };
    function Tabs({ onTabSelect }: TabProps) {
        return (
            <div className="tabs">
                <div className="tab-item" onClick={() => onTabSelect('photos')}>
                    photos
                </div>
                <div className="tab-item" onClick={() => onTabSelect('comments')}>
                    comments
                </div>
            </div>
        );
    }

    const Comments = React.lazy(
        () =>
            new Promise<{ default: React.FC<{}> }>(res => {
                setTimeout(() => {
                    res(import('./2.Comments'));
                }, 2000);
            }),
    );
    const Photos = React.lazy(
        () =>
            new Promise<{ default: React.FC<{}> }>(res => {
                setTimeout(() => {
                    res(import('./2.Photos'));
                }, 2000);
            }),
    );
    function MyComponent() {
        const [tab, setTab] = React.useState<TabType>('photos');
        function handleTabSelect(tab: TabType) {
            setTab(tab);
        }
        return (
            <div>
                <Tabs onTabSelect={handleTabSelect} />
                <React.Suspense fallback={<div>Loading...</div>}>{tab === 'photos' ? <Photos /> : <Comments />}</React.Suspense>
            </div>
        );
    }
    rootRender(document.getElementById('root3_2_2') || document.body, <MyComponent />);
}
__avoiding_fallbacks();
