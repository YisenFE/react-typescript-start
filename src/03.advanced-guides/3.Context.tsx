import React from 'react';
import { rootRender } from '../common/rootRender';

/** 何时使用 Content */
function __when_to_use_context() {
    type State = {
        themeValue: 'dark' | 'light';
    };
    const ThemeContext = React.createContext('light');
    ThemeContext.displayName = 'ThemeContext__00';
    class App extends React.Component<{}, State> {
        constructor(props: {}) {
            super(props);
            this.state = {
                themeValue: 'dark',
            };
        }
        render() {
            const { themeValue } = this.state;
            return (
                <>
                    <button
                        onClick={() => {
                            this.setState({
                                themeValue: themeValue === 'dark' ? 'light' : 'dark',
                            });
                        }}
                    >
                        点我改变主题色
                    </button>
                    <ThemeContext.Provider value={themeValue}>
                        <Toolbar />
                    </ThemeContext.Provider>
                </>
            );
        }
    }
    function Toolbar() {
        return (
            <div>
                <ThemeButton />
            </div>
        );
    }
    class ThemeButton extends React.Component<{}> {
        // 指定 contextType 读取当前的 theme context。
        // React 会往上找到最近的 theme Provider，然后使用它的值。
        // 在这个例子中，当前的 theme 值为 “dark”。
        static contextType = ThemeContext;
        declare context: React.ContextType<typeof ThemeContext>;
        render() {
            return <ThemeColorValue theme={this.context} />;
        }
    }
    function ThemeColorValue({ theme }: { theme: string }) {
        return <div>当前主题色: {theme}</div>;
    }

    rootRender(document.getElementById('root3_3_1') || document.body, <App />);
}
__when_to_use_context();

/** 消费多个context */
function __consuming_multiple_contexts() {
    type AppState = {
        themeValue: 'dark' | 'light';
        backgroundColor: '#fff' | '#666';
    };
    const ThemeContext = React.createContext<'dark' | 'light'>('light');
    const BackgroundContext = React.createContext<'#fff' | '#666'>('#fff');
    class App extends React.Component<{}, AppState> {
        constructor(props: {}) {
            super(props);
            this.state = {
                themeValue: 'dark',
                backgroundColor: '#fff',
            };
        }
        render() {
            const { themeValue, backgroundColor } = this.state;
            return (
                <>
                    <button
                        onClick={() => {
                            this.setState({
                                themeValue: themeValue === 'dark' ? 'light' : 'dark',
                                backgroundColor: backgroundColor === '#666' ? '#fff' : '#666',
                            });
                        }}
                    >
                        点我改变主题色
                    </button>
                    <BackgroundContext.Provider value={backgroundColor}>
                        <ThemeContext.Provider value={themeValue}>
                            <Toolbar />
                        </ThemeContext.Provider>
                    </BackgroundContext.Provider>
                </>
            );
        }
    }
    function Toolbar() {
        return (
            <div>
                <BackgroundContext.Consumer>
                    {backgroundColor => (
                        <ThemeContext.Consumer>
                            {themeValue => <ThemeButton themeValue={themeValue} backgroundColor={backgroundColor} />}
                        </ThemeContext.Consumer>
                    )}
                </BackgroundContext.Consumer>
            </div>
        );
    }
    type ButtonProps = AppState;
    class ThemeButton extends React.Component<ButtonProps> {
        render() {
            const { themeValue, backgroundColor } = this.props;
            return <ThemeColorValue theme={themeValue} bgColor={backgroundColor} />;
        }
    }
    function ThemeColorValue({ theme, bgColor }: { theme: string; bgColor: string }) {
        return <div style={{ backgroundColor: bgColor }}>当前主题色: {theme}</div>;
    }

    rootRender(document.getElementById('root3_3_2') || document.body, <App />);
}
__consuming_multiple_contexts();
