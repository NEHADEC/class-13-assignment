"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function SystemManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-200 to-purple-300 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        ✨ Task Management
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <motion.button
          onClick={addTask}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Add
        </motion.button>
      </div>
      <ul className="space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`flex justify-between items-center p-2 rounded shadow ${
                task.completed ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              <span
                className={`flex-1 text-gray-800 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.text}
              </span>
              <motion.button
                onClick={() => toggleTaskCompletion(task.id)}
                whileHover={{ scale: 1.1 }}
                className="text-sm text-green-600 hover:underline"
              >
                {task.completed ? "Undo" : "Complete"}
              </motion.button>
              <motion.button
                onClick={() => deleteTask(task.id)}
                whileHover={{ scale: 1.1 }}
                className="text-sm text-red-600 hover:underline ml-2"
              >
                Delete
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
