/**
 * @file 组件 & Props
 * https://zh-hans.reactjs.org/docs/components-and-props.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';

/** 渲染组件, 组合组件 */
function __renderingComponent_ComposingComponent() {
    type Props = {
        name: string;
    };
    function Welcome({ name }: Props) {
        return <h1>Hello, {name}</h1>;
    }

    const element = (
        <React.Fragment>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </React.Fragment>
    );

    rootRender(document.getElementById('root2_4_1') || document.body, element);
}
__renderingComponent_ComposingComponent();

/** 一个复杂的组件 */
function __oneComplexComponent() {
    type Props = {
        author: {
            avatarUrl: string;
            name: string;
        };
        text: string;
        date: Date;
    };
    function Comment({ author, text, date }: Props) {
        return (
            <div className="Comment">
                <div className="UserInfo">
                    <img className="Avatar" src={author.avatarUrl} alt={author.name} />
                    <div className="UserInfo-name">{author.name}</div>
                </div>
                <div className="Comment-text">{text}</div>
                <div className="Comment-data">{formatDate(date)}</div>
            </div>
        );

        function formatDate(date: Date) {
            return date.toLocaleDateString();
        }
    }

    const comment = {
        date: new Date(),
        text: 'I hope you enjoy learning React!',
        author: {
            name: 'Hello Kitty',
            avatarUrl: 'http://placekitten.com/g/64/64',
        },
    };
    rootRender(
        document.getElementById('root2_4_2') || document.body,
        <Comment date={comment.date} text={comment.text} author={comment.author}></Comment>,
    );
}
__oneComplexComponent();

/** 提取组件 */
function __extractingComponent() {
    type AvatarProps = {
        user: {
            avatarUrl: string;
            name: string;
        };
    };
    function Avatar({ user }: AvatarProps) {
        return <img className="Avatar" src={user.avatarUrl} alt={user.name} />;
    }

    function UserInfo({ user }: AvatarProps) {
        return (
            <div className="UserInfo">
                <Avatar user={user}></Avatar>
                <div className="UserInfo-name">{user.name}</div>
            </div>
        );
    }

    type CommentProps = {
        author: {
            avatarUrl: string;
            name: string;
        };
        text: string;
        date: Date;
    };
    function Comment({ author, text, date }: CommentProps) {
        return (
            <div className="Comment">
                <UserInfo user={author} />
                <div className="Comment-text">{text}</div>
                <div className="Comment-data">{formatDate(date)}</div>
            </div>
        );

        function formatDate(date: Date) {
            return date.toLocaleDateString();
        }
    }

    const comment = {
        date: new Date(),
        text: 'I hope you enjoy learning React!',
        author: {
            name: 'Hello Kitty',
            avatarUrl: 'http://placekitten.com/g/64/64',
        },
    };
    rootRender(
        document.getElementById('root2_4_3') || document.body,
        <Comment date={comment.date} text={comment.text} author={comment.author}></Comment>,
    );
}
__extractingComponent();
