const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { todoRouter } = require("./Routes/todo");

const app = express();

const PORT = process.env.port;

app.use(express.json());

app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is connected to port ${PORT} and is running!`);
});
