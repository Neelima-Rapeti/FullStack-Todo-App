const { pool } = require("../db");

const getTodos = async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todos;");
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(`SELECT * FROM todos where id=$1;`, [id]);
    console.log(id);
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

const getTodoSteps = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM steps where todo_id=$1;`, [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createTodo = async (req, res) => {
  try {
    const { value, status, deadline, priority, created_at } = req.body;

    const todo = await pool.query(
      `INSERT INTO todos (value, status, deadline, priority, created_at) VALUES ($1, $2, $3, $4 ,$5) RETURNING *;`,
      [value, status, deadline, priority, created_at]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, status, deadline, priority, created_at } = req.body;

    const todo = await pool.query(
      `UPDATE todos SET value=$1, status=$2, deadline=$3, priority=$4, created_at=$5 WHERE id=$6 RETURNING *;`,
      [value, status, deadline, priority, created_at, id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("something went wrong");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM todos where id=$1;`, [id]);
    res.json(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

module.exports = {
  getTodos,
  getTodo,
  getTodoSteps,
  createTodo,
  updateTodo,
  deleteTodo,
};
