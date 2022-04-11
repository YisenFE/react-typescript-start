import React from 'react';

type SquaresItemValue = 'X' | 'O' | number | null;

type SquareProps = {
    value: SquaresItemValue;
    highlight: boolean;
    onClick: () => void;
};

function Square({ value, highlight, onClick }: SquareProps): JSX.Element {
    let className = 'square';
    if (highlight) {
        className += ' text-rose-600';
    }
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
}
// class Square extends React.Component<SquareProps> {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

type BoardProps = {
    squares: Array<SquaresItemValue>;
    line?: number[];
    onClick: (i: number) => void;
};
type BoardState = {
    squares: Array<SquaresItemValue>;
    xIsNext: boolean;
};

class Board extends React.Component<BoardProps, BoardState> {
    renderSquare(i: number) {
        const { squares, line } = this.props;
        const highlight = Boolean(line && line.includes(i));
        return <Square key={i} value={squares[i]} highlight={highlight} onClick={() => this.props.onClick(i)} />;
    }
    renderSquareCoordinate(i?: number) {
        return (
            <button key={i} className="square-coordinate">
                {i}
            </button>
        );
    }

    render() {
        const arr = [0, 1, 2];
        return (
            <div>
                {this.renderSquareCoordinate()}
                {arr.map(colIndex => this.renderSquareCoordinate(colIndex))}
                {arr.map(rowIndex => {
                    return (
                        <div className="board-row" key={rowIndex}>
                            {this.renderSquareCoordinate(rowIndex)}
                            {arr.map(colIndex => this.renderSquare(colIndex + rowIndex * arr.length))}
                        </div>
                    );
                })}
            </div>
        );
    }
}

enum SortMode {
    descending,
    ascending,
}
type GameState = {
    history: Array<{
        squares: SquaresItemValue[];
        coordinate?: Coordinate;
    }>;
    xIsNext: boolean;
    stepNumber: number;
    /** @default 'descending' */
    sortMode: SortMode;
    line?: number[];
};
class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            sortMode: SortMode.descending, // 默认降序
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    coordinate: getCoordinate(i),
                },
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step: number, e: React.MouseEvent) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const { winner, line } = calculateWinner(current.squares);
        const JSXElmMoves = history.map((step, move) => {
            let desc = move ? 'Go to move #' + move : 'Go to game start';

            if (step.coordinate) {
                desc += `  ${step.coordinate}`;
            }
            return (
                <li key={move}>
                    <button
                        className={move === this.state.stepNumber ? 'font-black text-rose-600' : undefined}
                        onClick={e => this.jumpTo(move, e)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        console.log(JSXElmMoves);

        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (history.length <= 9) {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = '平局';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} line={line} onClick={i => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.sortMode === SortMode.descending ? JSXElmMoves : JSXElmMoves.reverse()}</ol>
                </div>
                <div className="sort-mode">
                    <button onClick={() => this.setState({ sortMode: getNextSortMode(this.state.sortMode) })}>
                        {SortMode[this.state.sortMode]}
                    </button>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: BoardState['squares']) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: [a, b, c],
            };
        }
    }
    return {};
}

// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
type Coordinate = `(${number}, ${number})`;
function getCoordinate(i: number): Coordinate {
    const x = i % 3;
    const y = (i / 3) >> 0;
    return `(${x}, ${y})`;
}

function getNextSortMode(sortMode: SortMode): SortMode {
    const len = 2;
    return (sortMode + 1) % len;
}

export default Game;
