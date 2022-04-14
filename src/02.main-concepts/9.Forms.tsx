/**
 * @file 表单
 * https://zh-hans.reactjs.org/docs/forms.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';

/** 受控组件 */
function __controlled_component() {
    type NameFormState = {
        value: string;
    };
    class NameForm extends React.Component<{}, NameFormState> {
        constructor(props: {}) {
            super(props);
            this.state = { value: '' };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        // HTMLInputElement -> HTMLElement -> Element -> Node -> EventTarget -> Object
        handleChange(event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({ value: event.target.value });
        }

        handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            alert('提交的名字: ' + this.state.value);
            event.preventDefault();
        }

        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        名字:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="提交" />
                </form>
            );
        }
    }
    rootRender(document.getElementById('root2_9_1') || document.body, <NameForm />);
}
__controlled_component();

/** textarea 标签 */
function __textarea_tag() {
    type EssayFormState = {
        value: string;
    };
    class EssayForm extends React.Component<{}, EssayFormState> {
        constructor(props: {}) {
            super(props);
            this.state = {
                value: '请撰写一篇关于你喜欢的 DOM 元素的文章.',
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
            this.setState({ value: event.target.value });
        }

        handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            alert('提交的文章: ' + this.state.value);
            event.preventDefault();
        }

        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        文章:
                        <textarea value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="提交" />
                </form>
            );
        }
    }
    rootRender(document.getElementById('root2_9_2') || document.body, <EssayForm />);
}
__textarea_tag();

/** select 标签 */
function __select_tag() {
    type FlavorFormState = {
        value: string;
    };
    class FlavorForm extends React.Component<{}, FlavorFormState> {
        constructor(props: {}) {
            super(props);
            this.state = { value: 'coconut' };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
            this.setState({ value: event.target.value });
        }

        handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            alert('你喜欢的风味是: ' + this.state.value);
            event.preventDefault();
        }
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        选择你喜欢的风味:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">葡萄柚</option>
                            <option value="lime">酸橙</option>
                            <option value="coconut">椰子</option>
                            <option value="mango">芒果</option>
                        </select>
                        <input type="submit" value="提交" />
                    </label>
                </form>
            );
        }
    }
    rootRender(document.getElementById('root2_9_3') || document.body, <FlavorForm />);
}
__select_tag();

/** 处理多个输入 */
function __handling_multiple_inputs() {
    type ReservationState = {
        isGoing: boolean;
        numberOfGuests: string;
    };
    type MyHTMLInputTypeAttribute = 'text' | 'checkbox' | 'number';
    type StateType = TypeForInput<ReservationState>;
    type TypeForInput<T> = {
        [K in keyof T]: { name: K; type: T[K] extends boolean ? 'checkbox' : Exclude<MyHTMLInputTypeAttribute, 'checkbox'> };
    }[keyof T];
    class Reservation extends React.Component<{}, ReservationState> {
        constructor(props: {}) {
            super(props);
            this.state = {
                isGoing: true,
                numberOfGuests: '2',
            };
        }
        handleInputChange(event: React.ChangeEvent<HTMLInputElement & StateType>) {
            const { target } = event;
            if (target.type === 'checkbox') {
                const value = target.checked;
                const name = target.name;
                this.setState({
                    [name]: value,
                });
            } else {
                const value = target.value;
                const name = target.name;
                this.setState({
                    [name]: value,
                });
            }
        }

        render() {
            return (
                <form>
                    <label>
                        参与:
                        <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        来宾人数:
                        <input
                            name="numberOfGuests"
                            type="number"
                            value={this.state.numberOfGuests}
                            onChange={this.handleInputChange.bind(this)}
                        />
                    </label>
                </form>
            );
        }
    }
    rootRender(document.getElementById('root2_9_4') || document.body, <Reservation />);
}
__handling_multiple_inputs();

/** 受控输入空值 */
function __controlled_input_null_value() {
    // 在受控组件上指定 value 的 prop 会阻止用户更改输入。
    // 如果你指定了 value，但输入仍可编辑，则可能是你意外地将 value 设置为 undefined 或 null。
    rootRender(
        document.getElementById('root2_9_5') || document.body,
        <React.Fragment>
            <span>不可输入</span>
            <input value="h1" />
        </React.Fragment>,
    );

    setTimeout(() => {
        rootRender(
            document.getElementById('root2_9_5') || document.body,
            <React.Fragment>
                <span>可输入</span>
                <input value={undefined} />
            </React.Fragment>,
        );
    }, 10000);
}
__controlled_input_null_value();
