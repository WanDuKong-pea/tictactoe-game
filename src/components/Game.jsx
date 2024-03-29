import React, {useState} from "react";
import '../index.css'
import Board from "./Board";



const Game = () => {
    //squares 배열 여러개로 이루어진 history state를 추가
    //squares[0]이 첫번째 게임판 상태를 가짐
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);

    //현재 진행중인 단계를 나타내는 stepNumber state를 추가
    const [stepNumber, setStepNumber] = useState(0);

    //Board 컴포넌트에서 handleClick을 Game 컴포넌트로 옮겨옴
    const handleClick = (i) => {
        //불필요한 렌더링을 막기 위해 history 배열을 복사
        const newHistory = history.slice(0, stepNumber + 1);
        //복사한 배열 길이-1이 현재 게임판 상태
        const current = newHistory[newHistory.length - 1];
        //squares 배열을 복사
        const squares = [...current.squares];

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat([{squares: squares}]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    //jumpTo 메서드는 stepNumber를 업데이트
    //xIsNext가 짝수일 때 true -> X
    //xIsNext가 홀수일 때 false -> O
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const newhistory = history;
    const current = newhistory[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner){
        status = `Winner: ${winner}`;
    }else{
        status = `Next player: ${xIsNext?"X":"O"}`;
    }

    const moves = history.map((step, move) => {
        const desc = move ? 
            `Go to move #${move}` : 
            `Go to game start`;
        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i)=>handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
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

export default Game;