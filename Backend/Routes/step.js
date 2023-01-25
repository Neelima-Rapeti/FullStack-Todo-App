const express = require("express");
const stepRouter = express.Router();
const {
  getSteps,
  getStep,
  createStep,
  updateStep,
  deleteStep,
} = require("../Controller/step");

stepRouter.get("/", getSteps);

stepRouter.get("/:id", getStep);

stepRouter.post("/", createStep);

stepRouter.put("/:id", updateStep);

stepRouter.delete("/:id", deleteStep);

module.exports = {
  stepRouter,
};
