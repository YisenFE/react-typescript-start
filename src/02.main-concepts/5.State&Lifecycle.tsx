/**
 * @file State & 生命周期
 * https://zh-hans.reactjs.org/docs/state-and-lifecycle.html
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrap } from '../common/AppWrap';

const ROOT_ID = 'root2_5';

const container = document.getElementById(ROOT_ID) || document.body;
const root = ReactDOM.createRoot(container);

type ClockState = {
    date: Date;
    counter: number;
};
type ClockProps = {
    increment: number;
};
class Clock extends React.Component<ClockProps, ClockState> {
    timerID: ReturnType<typeof setInterval> | null;
    constructor(props: ClockProps) {
        super(props);
        this.state = { date: new Date(), counter: 0 };
        this.timerID = null;
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.setState({
            counter: this.state.counter + this.props.increment,
        });
    }

    componentWillUnmount() {
        if (this.timerID !== null) {
            clearInterval(this.timerID);
        }
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <AppWrap id={ROOT_ID}>
                <h1>Hello, world!</h1>
                <FormattedDate date={this.state.date} />
            </AppWrap>
        );
    }
}
function FormattedDate({ date }: { date: Date }) {
    return <h2>It is {date.toLocaleTimeString()}.</h2>;
}

root.render(<Clock increment={1} />);
