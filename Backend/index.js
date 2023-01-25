const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { todoRouter } = require("./Routes/todo");
const { stepRouter } = require("./Routes/step");

const app = express();

const PORT = process.env.port;

app.use(cors());

app.use(express.json());

app.use("/todos", todoRouter);
app.use("/steps", stepRouter);

app.listen(PORT, () => {
  console.log(`Server is connected to port ${PORT} and is running!`);
});
