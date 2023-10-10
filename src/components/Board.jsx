import React, {useState} from "react";
import '../index.css'
import Square from "./Square";


const Board = () => {
    //Square 컴포넌트에서 Board 컴포넌트로 state를 올리기 위해
    //Board 컴포넌트에서 state를 생성하고 Square 컴포넌트에 props로 전달
    //총 9개의 Square 컴포넌트를 렌더링하기 위해 9개의 인덱스를 가진 배열을 생성
    const [squares, setSquares] = useState(Array(9).fill(null));
    //X와 O를 번갈아 가면서 표시하기 위해 state를 생성
    //true면 X, false면 O
    //handleClick 함수에서 X와 O를 번갈아 가면서 표시할 것
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        //square는 리액트의 state로 사용하기 위해 생성된 배열이기 떄문에
        //직접 수정하면 안된다(rendering 문제 생김). 그 대신에 불변성을 유지하면서 배열의 복사본을 생성해야 함.
        //slice와 같은 배열 함수를 직접 사용해도 됨(squares.slick()). 하지만, 배열의 크기가 커지면
        //복사본을 생성하는 것이 어려워짐. 그래서 배열의 복사본을 생성하는 더 쉬운 방법인 
        //배열 리터럴 문법을 사용하는 것 => const squares = [...squares];
        const newSquares = [...squares];

        //누군가 승리하거나 Square가 이미 채워졌다면 Board의 handleClick 함수가 
        //더 이상 실행되지 않도록 함
        //squares[i]가 null이 아니면 이미 Square가 채워졌다는 의미.
        if(calculateWinner(squares) || squares[i]){
            return;
        }

        //새로운 배열에 클릭한 플레이어의 값을 저장
        newSquares[i] = xIsNext ? 'X' : 'O';
        //squares:newSquares를 사용하지 않는 이유는
        //squares는 리액트의 state이기 때문에 직접 수정하면 안되기 때문
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)}/>;
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = `Winner: ${winner}`;
    }else{
        status = `Next player: ${xIsNext?"X":"O"}`;
    }

    return (
        <div>
            <div className="status">{status}</div>
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

 /**
  * 게임의 승자를 확인하는 함수
  * X,O 또는 null(무승부)을 반환
  */
 function calculateWinner(squares) {
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
        return squares[a];
      }
    }
  
    return null;
  }

export default Board;