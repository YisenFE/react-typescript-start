/**
 * @file 组合 vs 继承
 * https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';
import './style/11.CompositionVsInheritance.scss';

/** 包含关系 */
function __containment() {
    function FancyBorder({ color, children }: { color: string; children: React.ReactNode }) {
        return <div className={'FancyBorder FancyBorder-' + color}>{children}</div>;
    }

    function WelcomeDialog() {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">Welcome</h1>
                <p className="Dialog-message">Thank you for visiting out spacecraft!</p>
            </FancyBorder>
        );
    }

    function SplitPane({ left, right }: { left: JSX.Element; right: JSX.Element }) {
        return (
            <div className="SplitPane">
                <div className="SplitPane-left">{left}</div>
                <div className="SplitPane-right">{right}</div>
            </div>
        );
    }
    function Contacts() {
        return <div className="Contacts" />;
    }

    function Chat() {
        return <div className="Chat" />;
    }

    rootRender(
        document.getElementById('root2_11_1') || document.body,
        <React.Fragment>
            <WelcomeDialog />
            <SplitPane left={<Contacts />} right={<Chat />} />
        </React.Fragment>,
    );
}
__containment();

/** 特例关系_函数组件 */
function __specialization_function() {
    // 有些时候，我们会把一些组件看作是其他组件的特殊实例，
    // 比如 WelcomeDialog 可以说是 Dialog 的特殊实例。

    // 在 React 中，我们也可以通过组合来实现这一点。
    // “特殊”组件可以通过 props 定制并渲染“一般”组件：
    function FancyBorder({ color, children }: { color: string; children: React.ReactNode }) {
        return <div className={'FancyBorder FancyBorder-' + color}>{children}</div>;
    }
    function Dialog({ title, message }: { title: string; message: string }) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">{title}</h1>
                <p className="Dialog-message">{message}</p>
            </FancyBorder>
        );
    }
    function WelcomeDialog() {
        return <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />;
    }
    rootRender(document.getElementById('root2_11_2') || document.body, <WelcomeDialog />);
}
__specialization_function();

/** 特例关系_class组件 */
function __specialization_class() {
    function FancyBorder({ color, children }: { color: string; children: React.ReactNode }) {
        return <div className={'FancyBorder FancyBorder-' + color}>{children}</div>;
    }
    function Dialog({ title, message, children }: { title: string; message: string; children: React.ReactNode }) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">{title}</h1>
                <p className="Dialog-message">{message}</p>
                {children}
            </FancyBorder>
        );
    }

    class SignUpDialog extends React.Component<{}, { login: string }> {
        constructor(props: {}) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSignUp = this.handleSignUp.bind(this);
            this.state = { login: '' };
        }

        render() {
            return (
                <Dialog title="Mars Exploration Program" message="How should we refer to you?">
                    <input value={this.state.login} onChange={this.handleChange} />
                    <button onClick={this.handleSignUp}>Sign Me Up!</button>
                </Dialog>
            );
        }

        handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            this.setState({ login: e.target.value });
        }

        handleSignUp() {
            alert(`Welcome aboard, ${this.state.login}!`);
        }
    }

    rootRender(document.getElementById('root2_11_3') || document.body, <SignUpDialog />);
}
__specialization_class();
