import React, {useState} from "react";
import '../index.css'
import Square from "./Square";


const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = (i) => {
        //square는 리액트의 state로 사용하기 위해 생성된 배열이기 떄문에
        //직접 수정하면 안된다(rendering 문제 생김). 그 대신에 불변성을 유지하면서 배열의 복사본을 생성해야 함.
        //slice와 같은 배열 함수를 직접 사용해도 됨(squares.slick()). 하지만, 배열의 크기가 커지면
        //복사본을 생성하는 것이 어려워짐. 그래서 배열의 복사본을 생성하는 더 쉬운 방법인 
        //배열 리터럴 문법을 사용하는 것 => const squares = [...squares];
        const newSquares = [...squares];
        newSquares[i] = 'X';
        //squares:newSquares를 사용하지 않는 이유는
        //squares는 리액트의 state이기 때문에 직접 수정하면 안되기 때문
        setSquares(newSquares);
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)}/>;
    }

    return (
        <div>
            <div className="status">Next player: X</div>
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