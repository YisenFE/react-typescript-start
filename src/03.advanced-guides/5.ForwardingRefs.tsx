/**
 * @file refs 转发
 */

import React, { ReactNode, MouseEventHandler, useState } from 'react';
import { rootRender } from '../common/rootRender';

/** 转发 refs 到 DOM 组件 */
function forwarding_refs_to_DOM_components() {
    type FancyButtonProps = { children: ReactNode; onClick: MouseEventHandler<HTMLButtonElement> };
    const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>((props, ref) => (
        <button ref={ref} className="fancy-button" onClick={props.onClick}>
            {props.children}
        </button>
    ));

    // 你可以直接获取 DOM button 的 ref：
    const ref = React.createRef<HTMLButtonElement>();
    const handleClick = () => {
        console.log(ref);
    };
    function App() {
        return (
            <FancyButton ref={ref} onClick={handleClick}>
                Click me!
            </FancyButton>
        );
    }

    /**
     * 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
     * 我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
     * React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
     * 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
     * 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
     */

    rootRender(document.getElementById('root3_5_1') || document.body, <App />);
}
forwarding_refs_to_DOM_components();

/** 在高阶组件中转发 refs */
function __forwarding_refs_in_higher_order_components() {
    function logProps<T>(WrappedComponent: React.ComponentType<T>) {
        type Props = {
            forwardedRef: React.ForwardedRef<any>;
        } & T;
        class LogProps<P extends Props> extends React.Component<P, {}> {
            componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<{}>, snapshot?: any) {
                console.log('old props: ', prevProps);
                console.log('new props: ', this.props);
            }
            render() {
                const { forwardedRef, ...rest } = this.props;
                return <WrappedComponent ref={forwardedRef} {...(rest as T)} />;
            }
        }
        return React.forwardRef<HTMLElement, T>((props, ref) => {
            return <LogProps {...props} forwardedRef={ref} />;
        });
    }
    type FancyButtonProps = {
        label: string;
        handleClick: () => void;
    };
    class FancyButton extends React.Component<FancyButtonProps> {
        render() {
            const { label, handleClick } = this.props;
            return (
                <button className="fancy-button" onClick={handleClick}>
                    {label}
                </button>
            );
        }
    }
    const HOC_FancyButton = logProps<FancyButtonProps>(FancyButton);
    const ref = React.createRef<HTMLElement>();
    function App() {
        const [label, setLabel] = useState('Click me');
        return (
            <HOC_FancyButton
                label={label}
                handleClick={() => {
                    console.log('handleClick');
                    setLabel('Click me!!');
                }}
                ref={ref}
            />
        );
    }
    rootRender(document.getElementById('root3_5_2') || document.body, <App />);
}
__forwarding_refs_in_higher_order_components();
