"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import { motion } from "framer-motion";

const choices = ["Rock", "Paper", "Scissors"] as const;

export default function Games() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const playGame = (player: string) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(player);
    setComputerChoice(computer);

    if (player === computer) {
      setResult("It's a Draw!");
    } else if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      setResult("You Win!");
    } else {
      setResult("You Lose!");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        ✊ Rock, ✋ Paper, ✌️ Scissors
      </motion.h1>
      <motion.div
        className="flex justify-around gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {choices.map((choice) => (
          <motion.button
            key={choice}
            onClick={() => playGame(choice)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition"
          >
            {choice}
          </motion.button>
        ))}
      </motion.div>
      {playerChoice && computerChoice && (
        <motion.div
          className="text-center bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-lg">
            You chose: <strong className="text-blue-600">{playerChoice}</strong>
          </p>
          <p className="mb-2 text-lg">
            Computer chose:{" "}
            <strong className="text-red-600">{computerChoice}</strong>
          </p>
          <motion.p
            className={`text-2xl font-bold mt-4 ${
              result === "You Win!"
                ? "text-green-600"
                : result === "You Lose!"
                ? "text-red-600"
                : "text-gray-600"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {result}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
