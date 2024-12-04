



"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true); // Player X's turn
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerMove, setIsPlayerMove] = useState(true);

  // Handle player's move (X)
  const handleClick = (index: number) => {
    if (board[index] || winner || isGameOver || !isPlayerMove) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXTurn(false);
    setIsPlayerMove(false);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      endGame(gameWinner, newBoard);
    } else if (newBoard.every((cell) => cell)) {
      endGame("Draw");
    } else {
      setTimeout(() => computerMove(newBoard), 500); // Add a slight delay for realism
    }
  };

  // AI Logic (Computer's Move - O)
  const computerMove = (newBoard: string[]) => {
    const emptyCells = newBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newBoard[randomIndex] = "O";
    setBoard([...newBoard]);
    setIsXTurn(true);
    setIsPlayerMove(true);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      endGame(gameWinner, newBoard);
    } else if (newBoard.every((cell) => cell)) {
      endGame("Draw");
    }
  };

  // End game logic
  const endGame = (result: string, finalBoard?: string[]) => {
    setWinner(result);
    setIsGameOver(true);

    if (result !== "Draw" && finalBoard) {
      const winningCombo = getWinningCombo(finalBoard);
      setWinningCombo(winningCombo);
    }
  };

  // Check for winner
  const checkWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Get winning combination
  const getWinningCombo = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }
    return null;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningCombo(null);
    setIsGameOver(false);
    setIsPlayerMove(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe - Player vs Computer</h1>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 flex items-center justify-center border text-2xl font-bold cursor-pointer ${
              winningCombo?.includes(index)
                ? "bg-green-300"
                : "bg-white hover:bg-gray-200"
            }`}
            animate={{ scale: cell ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {cell}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-lg">
        {winner ? (
          <p>
            {winner === "Draw" ? (
              "It's a draw! 🤝"
            ) : (
              <>
                🎉 Winner: <span className="font-bold">{winner}</span>
              </>
            )}
          </p>
        ) : (
          <p>Turn: {isXTurn ? "Player X" : "Computer (O)"}</p>
        )}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
