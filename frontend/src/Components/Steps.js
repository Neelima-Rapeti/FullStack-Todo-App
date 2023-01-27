import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ContentEditable from "react-contenteditable";

export default function Steps({ step, setSteps, todoid, step_id }) {
  const [isClicked, setIsClicked] = useState(false);
  const [editButton, setEditText] = useState("edit");
  const [value, setValue] = useState("");
  const [number, setNumber] = useState(`${step.step}`);

  function handleChange(e) {
    setValue(e.target.innerHTML);
  }

  function handleChangeNum(event) {
    setNumber(event.target.innerHTML);
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
  console.log(value);
  console.log(number);
  console.log(todoid);
  const handleClickDone = () => {
    setIsClicked(!isClicked);
  };

  const handleClickEdit = () => {
    if (editButton === "edit") {
      setEditText("save");
    } else {
      putStep();
      setEditText("edit");
    }
  };

  return (
    <div>
      <div key={step.id}>
        <div contentEditable onInput={handleChangeNum}>
          {step.step}.
        </div>
        <div
          contentEditable
          onInput={handleChange}
          style={{ textDecorationLine: isClicked ? "line-through" : "none" }}
        >
          {step.description}
        </div>
      </div>
      <div>
        <button onClick={handleClickDone}>Done</button>
        <button onClick={handleClickEdit}>{editButton}</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
