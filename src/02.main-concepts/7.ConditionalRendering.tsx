/**
 * @file 条件渲染
 * https://zh-hans.reactjs.org/docs/conditional-rendering.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';

function __login_logout() {
    function UserGreeting() {
        return <h1>Welcome back!</h1>;
    }

    function GuestGreeting() {
        return <h1>Please sign up.</h1>;
    }

    function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
        if (isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }

    function LoginButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
        return <button onClick={onClick}>Login</button>;
    }

    function LogoutButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
        return <button onClick={onClick}>Logout</button>;
    }

    type LoginControlProps = {
        isLoggedIn: boolean;
    };
    class LoginControl extends React.Component<{}, LoginControlProps> {
        constructor(props: {}) {
            super(props);
            this.handleLoginClick = this.handleLoginClick.bind(this);
            this.handleLogoutClick = this.handleLogoutClick.bind(this);
            this.state = { isLoggedIn: false };
        }

        handleLoginClick() {
            this.setState({ isLoggedIn: true });
        }
        handleLogoutClick() {
            this.setState({ isLoggedIn: false });
        }

        render() {
            const isLoggedIn = this.state.isLoggedIn;
            let button;
            if (isLoggedIn) {
                button = <LogoutButton onClick={this.handleLogoutClick} />;
            } else {
                button = <LoginButton onClick={this.handleLoginClick} />;
            }

            return (
                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    {button}
                </div>
            );
        }
    }

    rootRender(document.getElementById('root2_7_1') || document.body, <LoginControl />);
}
__login_logout();

/** 阻止组件渲染 */
function __preventing_component_form_rendering() {
    function WarningBanner({ warn }: { warn: boolean }) {
        if (!warn) {
            return null;
        }

        return <div className="warning">Warning!</div>;
    }

    type PageProps = {
        showWarning: boolean;
    };
    class Page extends React.Component<{}, PageProps> {
        constructor(props: {}) {
            super(props);
            this.state = { showWarning: true };
            this.handleToggleClick = this.handleToggleClick.bind(this);
        }

        handleToggleClick() {
            this.setState(prevState => ({
                showWarning: !prevState.showWarning,
            }));
        }

        render() {
            return (
                <React.Fragment>
                    <WarningBanner warn={this.state.showWarning} />
                    <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
                </React.Fragment>
            );
        }
    }

    rootRender(document.getElementById('root2_7_2') || document.body, <Page />);
}
__preventing_component_form_rendering();
