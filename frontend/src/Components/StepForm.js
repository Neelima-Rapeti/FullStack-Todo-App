import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StepForm({ setSteps, id }) {
  const [value, setValue] = useState("");
  const [number, setNumber] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleChangeNum(event) {
    setNumber(event.target.value);
  }

  const postData = {
    description: value,
    step: number,
    status: false,
    created_at: new Date(),
    todo_id: id,
  };

  function clickHander(event) {
    event.preventDefault();
    axios.post("http://localhost:4040/steps", postData).then((res) => {
      setSteps((steps) => {
        return [...steps, res.data];
      });
    });
  }

  return (
    <>
      <form>
        <input
          type="number"
          onChange={handleChangeNum}
          placeholder="step number"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="enter new step"
        />
        <button onClick={clickHander}>ADD</button>
      </form>
    </>
  );
}
