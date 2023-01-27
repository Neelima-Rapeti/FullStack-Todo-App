import axios from "axios";
import React from "react";
import { useState } from "react";

function Form({ setTodos }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  const postData = { value, status: false };

  function clickHander(event) {
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
          <input type="text" onChange={handleChange} />
        </label>
        <button onClick={clickHander}>ADD</button>
      </form>
    </>
  );
}

export default Form;
