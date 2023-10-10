import React from "react";
import '../index.css'
import Square from "./Square";


const Board = (props) => {
    const renderSquare = (i) => {
        //Board 컴포넌트의 handleClick을 Game 컴포넌트로 이동했음
        //Board 컴포넌트는 더 이상 state를 가지지 않음
        return <Square value={props.squares[i]} onClick={() => props.onClick(i)}/>;
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}



export default Board;