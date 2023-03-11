/**
 * @file Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。
 */

import React, { useEffect, useRef } from 'react';
import { rootRender } from '../common/rootRender';
import './css/11.Portals.scss';

/** 用法 */
function __usage() {
    const myRef = React.createRef<HTMLDivElement>();
    function MyComponent() {
        console.log('myRef', myRef);
        useEffect(() => {
            console.log('myRef', myRef);
        }, []);
        return <div ref={myRef}>123</div>;
    }
    function App() {
        return <MyComponent />;
    }
    rootRender(document.querySelector('#root3_16_1') || document.body, <App />);
}
__usage();

/** 为 DOM 元素添加 ref */
function __adding_a_ref_to_a_dom_element() {
    const textInputRef = React.createRef<HTMLInputElement>();
    function CustomTextInput() {
        return (
            <div>
                <input type="text" ref={textInputRef} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={() => {
                        textInputRef.current?.focus();
                    }}
                />
            </div>
        );
    }
    rootRender(document.querySelector('#root3_16_2') || document.body, <CustomTextInput />);
}
__adding_a_ref_to_a_dom_element();

/** 为 class 组件添加 Ref */
function __adding_a_ref_to_a_class_component() {
    class CustomTextInput extends React.Component {
        textInput: HTMLInputElement | null = null;
        isFocus = false;
        setTextInputRef = (element: HTMLInputElement) => {
            this.textInput = element;
        };
        focusTextInput = () => {
            const { textInput, isFocus } = this;
            isFocus ? textInput?.blur() : textInput?.focus();
            this.isFocus = !isFocus;
        };
        render() {
            return (
                <div>
                    <input type="text" ref={this.setTextInputRef} />
                    <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
                </div>
            );
        }
    }
    function AutoFocusTextInput() {
        const textInputRef = useRef<CustomTextInput>(null);
        useEffect(() => {
            textInputRef.current?.focusTextInput();
        }, []);
        return <CustomTextInput ref={textInputRef} />;
    }
    rootRender(document.querySelector('#root3_16_3') || document.body, <AutoFocusTextInput />);
}
__adding_a_ref_to_a_class_component();
