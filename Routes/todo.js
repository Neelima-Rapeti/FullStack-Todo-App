const express = require("express");
const todoRouter = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controller/todo");

todoRouter.get("/", getTodos);

todoRouter.get("/:id", getTodo);

todoRouter.post("/", createTodo);

todoRouter.put("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

module.exports = {
  todoRouter,
};
