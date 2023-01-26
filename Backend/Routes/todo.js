const express = require("express");
const todoRouter = express.Router();
const {
  getTodos,
  getTodo,
  getTodoSteps,
  getTodoAndSteps,
  getTodosAndSteps,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controller/todo");

todoRouter.get("/", getTodos);

todoRouter.get("/:id", getTodo);

todoRouter.get("/:id/steps", getTodoSteps);

todoRouter.get("/:id/TodoAndSteps", getTodoAndSteps);

todoRouter.get("/TodosAndSteps", getTodosAndSteps);

todoRouter.post("/", createTodo);

todoRouter.put("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

module.exports = {
  todoRouter,
};
