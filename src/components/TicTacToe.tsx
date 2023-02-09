'use client';

import { useEffect, useState } from "react";

type Moves = { Row: number, Col: number }

export default function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameboard, setGameboard] = useState<(string | null)[][][]>(Array(9).fill(Array(3).fill(Array(3).fill(null))));
  const [playerMoves, setPlayerMoves] = useState<Moves[]>([] as Moves[]);
  const [computerMoves, setComputerMoves] = useState<Moves[]>([] as Moves[]);
  const [finishedBoards, setFinishedBoards] = useState(Array(3).fill(Array(3).fill(0)));
  const [validMoves, setValidMoves] = useState(Array(3).fill(Array(3).fill(true)));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isComputer, setIsComputer] = useState(false);

  useEffect(() => {
    // console.log("effect used to set computer");

    if (isComputer && currentPlayer === 'O' && !gameOver) {
      makeComputerMove();
    }
  }, [currentPlayer, isComputer]);

  const handleCellClick = (board: number, row: number, col: number) => {
    const boardThreeByThree = getRowColFlattenBoard(board)
    if (gameboard[board][row][col] != null || gameOver || currentPlayer === 'O' || !validMoves[Math.floor(boardThreeByThree.Row)][Math.floor(boardThreeByThree.Col)]) {
      return;
    }

    let newGameboard = JSON.parse(JSON.stringify(gameboard));
    newGameboard[board][row][col] = currentPlayer;
    setGameboard(newGameboard);

    const newMove = convertToEightByEight(board, row, col);
    let newPlayerMoves = playerMoves;
    newPlayerMoves.push(newMove);
    setPlayerMoves(newPlayerMoves);


    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setIsComputer(!isComputer);

  }

  const makeComputerMove = () => {
    // Make a post request to the server to get the computer's move
    //console.log(JSON.stringify({ "ComputerMoves": computerMoves, "PlayerMoves": playerMoves, "FinishedBoards": finishedBoards, "ValidMoves": validMoves }));
    fetch('https://api.frigon-e.ca/api/move/', { body: JSON.stringify({ "ComputerMoves": computerMoves, "PlayerMoves": playerMoves }), method: 'POST' })
      .then(response =>
        response.json())
      .then(data => {
        // console.log(data);

        let newComputerMoves: Moves[] = data.computerMoves.map((move: Moves) => ({
          Row: move.Row,
          Col: move.Col
        }));

        setComputerMoves(newComputerMoves);

        setGameOver(data.finishedGame.gameOver);
        setWinner(data.finishedGame.winner);

        if (data.finishedGame.gameOver) {
          return;
        }


        const computerLastMove = convertToThreeByThree(newComputerMoves[newComputerMoves.length - 1].Row, newComputerMoves[newComputerMoves.length - 1].Col);
        const playerLastMove = convertToThreeByThree(playerMoves[playerMoves.length - 1].Row, playerMoves[playerMoves.length - 1].Col);

        let newGameboard = JSON.parse(JSON.stringify(gameboard));
        newGameboard[computerLastMove.Board][computerLastMove.Row][computerLastMove.Col] = 'O';
        setGameboard(newGameboard);

        let newFinishedBoards = JSON.parse(JSON.stringify(data.finishedGame.completedBoard));


        if (JSON.stringify(newFinishedBoards) !== JSON.stringify(finishedBoards)) {
          setFinishedBoards(newFinishedBoards);
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (newFinishedBoards[i][j] === 1) {
                newGameboard[computerLastMove.Board] = Array(3).fill(Array(3).fill('O'));
              } else if (newFinishedBoards[i][j] === 2) {
                newGameboard[playerLastMove.Board] = Array(3).fill(Array(3).fill('X'));
              }
            }
          }
        }


        let newValidMoves = JSON.parse(JSON.stringify(data.validMoves));
        setValidMoves(newValidMoves);


        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setIsComputer(!isComputer);

        // console.log("Variables updated");
        // console.log("Computer moves: " + JSON.stringify(newComputerMoves));
        // console.log("Finished boards: " + JSON.stringify(newFinishedBoards));
        // console.log("Game over: " + gameOver);
        // console.log("Winner: " + winner);
      });

  }

  const convertToEightByEight = (board: number, row: number, col: number) => {
    const newRow = row + (3 * Math.floor(board / 3));
    const newCol = col + (3 * (board % 3));
    return { Row: newRow, Col: newCol };
  }

  const convertToThreeByThree = (row: number, col: number) => {
    const newBoard = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    const newRow = row % 3;
    const newCol = col % 3;
    return { Board: newBoard, Row: newRow, Col: newCol };
  }

  const getRowColFlattenBoard = (num: number) => {
    const newRow = num / 3
    const newCol = num % 3

    return { Row: newRow, Col: newCol }
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>
      {gameOver && (
        <div>
          {winner ? (
            <p> {winner === 2 ? "Human " : "Computer "} wins!</p>
          ) : (
            <p> Game is a draw </p>
          )}
          <button onClick={() => window.location.reload()} className={`mb-3`}>Play Again</button>
        </div>
      )}
      <div className={`max-w-fit max-h-fit mx-auto mb-8`}>
        {/* Show a message if the computer is making a move */}
        {isComputer && currentPlayer === 'O' && !gameOver && <p>The computer is making a move...</p>}
        <div className="grid grid-cols-3 gap-2 bg-gradient-to-tr from-emerald-400 to-cyan-500">
          {gameboard.map((board, boardIndex) => (
            <div key={boardIndex} className={classNames(
              validMoves[Math.floor(boardIndex / 3)][Math.floor(boardIndex % 3)] ? `bg-gradient-to-r from-pink-500 to-rose-500` : `bg-zinc-800`,
              `grid grid-flow-row gap-1 bg-zinc-900`)}>

              {board.map((row, rowIndex) => (
                <div key={rowIndex} className={`grid grid-flow-col gap-1`}>
                  {row.map((col, colIndex) => (
                    <div
                      key={colIndex}
                      onClick={() => {
                        handleCellClick(boardIndex, rowIndex, colIndex)
                      }}
                      className={`flex h-8 w-8 text-center items-center justify-center bg-zinc-900/95 sm:w-12 sm:h-12 lg:w-16 lg:h-16`}>
                      {col || ' '}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
