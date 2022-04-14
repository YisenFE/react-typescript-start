/**
 * @file 列表 & Key
 * https://zh-hans.reactjs.org/docs/lists-and-keys.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';

function ListItem({ value }: { value: number }) {
    return <li>{value}</li>;
}

type NumberListProps = {
    numbers: number[];
};
function NumberList({ numbers }: NumberListProps) {
    return (
        <ul>
            {numbers.map(number => (
                <ListItem key={number.toString()} value={number} />
            ))}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];

rootRender(document.getElementById('root2_8') || document.body, <NumberList numbers={numbers} />);
