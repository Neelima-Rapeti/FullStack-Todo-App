const { pool } = require("../db");

const getSteps = async (req, res) => {
  try {
    const step = await pool.query("SELECT * FROM steps;");
    res.json(step.rows);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
const getStep = async (req, res) => {
  try {
    const { id } = req.params;

    const step = await pool.query(`SELECT * FROM steps where id=$1;`, [id]);
    console.log(id);
    res.json(step.rows[0]);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

const createStep = async (req, res) => {
  try {
    const { description, step, status, created_at, todo_id } = req.body;

    const steps = await pool.query(
      `INSERT INTO steps (description, step, status, created_at, todo_id) VALUES ($1, $2, $3, $4 ,$5) RETURNING *;`,
      [description, step, status, created_at, todo_id]
    );

    res.json(steps.rows[0]);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

const updateStep = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, step, status, created_at, todo_id } = req.body;

    const steps = await pool.query(
      `UPDATE steps SET description=$1, step=$2, status=$3, created_at=$4, todo_id=$5 WHERE id=$6 RETURNING *;`,
      [description, step, status, created_at, todo_id, id]
    );

    res.json(steps.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("something went wrong");
  }
};

const deleteStep = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM steps where id=$1;`, [id]);
    res.json(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

module.exports = {
  getSteps,
  getStep,
  createStep,
  updateStep,
  deleteStep,
};
