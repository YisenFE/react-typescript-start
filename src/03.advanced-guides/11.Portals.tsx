/**
 * @file Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { rootRender } from '../common/rootRender';
import './css/11.Portals.scss';

/** 用法 */
function __usage() {
    const modalRootEl = document.querySelector('#root3_11_1 #modal-root');

    type ModalProps = {
        children?: React.ReactNode;
    };
    class Modal extends React.Component<ModalProps> {
        el: HTMLDivElement;
        constructor(props: ModalProps) {
            super(props);
            this.el = document.createElement('div');
        }
        componentDidMount(): void {
            modalRootEl?.appendChild(this.el);
        }
        render() {
            return ReactDOM.createPortal(this.props.children, this.el);
        }
    }
    function App() {
        const [showModal, setShowModal] = useState(false);
        const [clicks, setClicks] = useState(0);
        const handleClick = () => setClicks(clicks + 1);
        const handleShow = (e: React.SyntheticEvent) => {
            setShowModal(true);
            e.stopPropagation();
        };
        const handleHide = (e: React.SyntheticEvent) => {
            setShowModal(false);
            e.stopPropagation();
        };
        const modal = showModal ? (
            <Modal>
                <div className="modal">
                    <button>Click</button>
                    <button onClickCapture={handleHide}>Hide modal</button>
                </div>
            </Modal>
        ) : null;
        return (
            <div className="app" onClick={handleClick}>
                <p>Number of clicks: {clicks}</p>
                <button onClick={handleShow}>Show modal</button>
                {modal}
            </div>
        );
    }
    rootRender(document.querySelector('#root3_11_1 #app-root') || document.body, <App />);
}
__usage();
