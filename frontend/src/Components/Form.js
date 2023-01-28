import axios from "axios";
import React from "react";
import { useState } from "react";

function Form({ setTodos }) {
  const [value, setValue] = useState("");
  const [prio, setPrio] = useState("");
  const [finishDate, setFinishDate] = useState("");

  function handleChangeValue(event) {
    setValue(event.target.value);
  }

  function handleChangePrio(event) {
    setPrio(event.target.value);
  }

  function handleChangeFinishDate(event) {
    setFinishDate(event.target.value);
  }

  const postData = {
    value,
    status: false,
    deadline: finishDate,
    priority: prio,
    created_at: new Date(),
  };

  function clickHander() {
    axios.post("http://localhost:4040/todos", postData).then((res) => {
      setTodos((todos) => {
        return [...todos, res.data];
      });
    });
  }

  return (
    <>
      <form>
        <label>
          Enter your Task:
          <br />
          <input
            type="text"
            onChange={handleChangeValue}
            placeholder="description"
          />
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            onChange={handleChangePrio}
            placeholder="5"
          />
          <input
            type="text"
            onChange={handleChangeFinishDate}
            placeholder="finish date"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </label>
        <button onClick={clickHander}>ADD</button>
      </form>
    </>
  );
}

export default Form;
