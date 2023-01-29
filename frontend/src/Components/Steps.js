import React from "react";
import { useState } from "react";
import axios from "axios";
import { CheckCircle } from "react-bootstrap-icons";
import { BsTrash } from "react-icons/bs";

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

  function putStep() {
    axios.put(`http://localhost:4040/steps/${step_id}`, putData).then((res) => {
      setSteps((steps) => {
        return steps.map((step) => {
          if (step.id === res.data.id) {
            return res.data;
          } else {
            return step;
          }
        });
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
    <div className="d-flex justify-content-between fs-6">
      <div className="d-flex">
        <div
          className="pe-2"
          contentEditable
          onInput={handleChangeNum}
          onBlur={handleBlur}
          suppressContentEditableWarning={true}
        >
          {step.step}
        </div>
        <div
          contentEditable
          onInput={handleChange}
          onBlur={handleBlur}
          className="todoTextDiv"
          style={{ textDecorationLine: isClicked ? "line-through" : "none" }}
          suppressContentEditableWarning={true}
        >
          {step.description}
        </div>
      </div>
      <div className="d-flex">
        <div className="pe-2">
          <CheckCircle onClick={handleClickDone} />
        </div>
        <div>
          <BsTrash
            onClick={(e) => {
              if (window.confirm(`You want to delete ${step.description}?`))
                deleteStep(step.id, e);
            }}
          />
        </div>
      </div>
    </div>
  );
}
