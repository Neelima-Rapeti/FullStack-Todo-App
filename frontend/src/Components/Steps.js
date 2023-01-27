import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Steps({ steps, step, setSteps, todoid, step_id }) {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(`${step.description}`);
  const [number, setNumber] = useState(`${step.step}`);

  function handleChange(e) {
    setValue(e.target.innerHTML);
  }

  function handleChangeNum(e) {
    setNumber(e.target.innerHTML);
  }

  const putData = {
    description: value,
    step: number,
    status: false,
    created_at: new Date(),
    todo_id: todoid,
  };

  function putStep(event) {
    axios.put(`http://localhost:4040/steps/${step_id}`, putData).then((res) => {
      setSteps((steps) => {
        return [...steps, res.data];
      });
    });
  }

  const handleClickDone = () => {
    setIsClicked(!isClicked);
  };

  const handleBlur = () => {
    putStep();
  };

  function deleteStep(id, e) {
    axios.delete(`http://localhost:4040/steps/${id}`).then((res) => {
      const delsteps = steps.filter((step) => step.id !== id);
      setSteps(delsteps);
    });
  }

  return (
    <div>
      <div key={step.id}>
        <div contentEditable onInput={handleChangeNum} onBlur={handleBlur}>
          {step.step}
        </div>
        <div
          contentEditable
          onInput={handleChange}
          onBlur={handleBlur}
          style={{ textDecorationLine: isClicked ? "line-through" : "none" }}
        >
          {step.description}
        </div>
      </div>
      <div>
        <button onClick={handleClickDone}>Done</button>

        <button onClick={(e) => deleteStep(step.id, e)}>Delete</button>
      </div>
    </div>
  );
}
