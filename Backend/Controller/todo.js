const { pool } = require("../db");

const getTodos = async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todos ORDER BY priority ASC;");
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

const getTodoAndSteps = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const todo = await pool.query(
      `SELECT steps.id, description, step, steps.status, steps.created_at, todo_id, value, deadline, priority  FROM steps JOIN todos ON steps.todo_id = todos.id where todo_id=$1 ORDER BY step ASC ;`,
      [todo_id]
    );
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getTodosAndSteps = async (req, res) => {
  try {
    const caca = await pool.query(
      `SELECT * FROM steps LEFT JOIN todos ON steps.todo_id = todos.id ;`
    );
    res.json(caca.rows);
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

// const createTodoStep = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description, step, status, created_at, todo_id } = req.body;

//     const todo = await pool.query(
//       `INSERT INTO steps (description=$1, step=, status, created_at, todo_id) VALUES ($1, $2, $3, $4 ,$5) where todo_id=$6 RETURNING *;`,
//       [description, step, status, created_at, todo_id, id]
//     );

//     res.json(todo.rows[0]);
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// };

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
  getTodoAndSteps,
  getTodosAndSteps,
  createTodo,
  // createTodoStep,
  updateTodo,
  deleteTodo,
};
