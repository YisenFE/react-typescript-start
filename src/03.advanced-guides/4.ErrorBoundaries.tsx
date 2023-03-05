import React from 'react';
import { rootRender } from '../common/rootRender';

/** 错误边界 */
function __introducing_error_boundaries() {
    const logErrorToMyService = (...args: any[]) => {
        console.log('logErrorToMyService: ', ...args);
    };
    type ErrorBoundaryProps = { children?: React.ReactNode };
    type ErrorBoundaryState = { error: any; errorInfo: any };
    class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
        constructor(props: ErrorBoundaryProps) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }
        componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
            this.setState({
                error: error,
                errorInfo: errorInfo,
            });
        }
        render() {
            if (this.state.errorInfo) {
                // 你可以自定义降级后的 UI 并渲染
                return (
                    <div>
                        <h2>Something went wrong.</h2>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </div>
                );
            }
            return this.props.children;
        }
    }

    type BuggyCounterProps = {};
    type BuggyCounterState = { counter: number };
    class BuggyCounter extends React.Component<BuggyCounterProps, BuggyCounterState> {
        constructor(props: BuggyCounterProps) {
            super(props);
            this.state = { counter: 0 };
        }
        handleClick = () => {
            this.setState(({ counter }) => ({
                counter: counter + 1,
            }));
        };
        render() {
            if (this.state.counter === 5) {
                // Simulate a JS error
                throw new Error('I crashed!');
            }
            return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
        }
    }
    function App() {
        return (
            <>
                <ErrorBoundary>
                    <p>
                        These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.
                    </p>
                    <BuggyCounter />
                    <BuggyCounter />
                </ErrorBoundary>
                <hr />
                <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
                <ErrorBoundary>
                    <BuggyCounter />
                </ErrorBoundary>
                <ErrorBoundary>
                    <BuggyCounter />
                </ErrorBoundary>
            </>
        );
    }
    rootRender(document.getElementById('root3_4_1') || document.body, <App />);
}
__introducing_error_boundaries();
