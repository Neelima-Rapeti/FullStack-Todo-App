import React from "react";
import Steps from "./Steps";
import { useEffect, useState } from "react";
import axios from "axios";
import StepForm from "./StepForm";
import { ArrowDownCircleFill } from "react-bootstrap-icons";

export default function Todo({ todo, setTodos, todo_id }) {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(`${todo.value}`);
  const [steps, setSteps] = useState([]);

  function handleChange(e) {
    setValue(e.target.innerHTML);
  }

  const putData = {
    value: value,
    status: false,
    deadline: new Date(),
    priority: 4,
    created_at: new Date(),
  };

  function putTodo(event) {
    event.preventDefault();
    axios.put(`http://localhost:4040/todos/${todo_id}`, putData).then((res) => {
      setTodos((todos) => {
        return [...todos, res.data];
      });
    });
  }
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleBlur = () => {
    putTodo();
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/todos/${todo_id}/TodoAndSteps`
        );

        setSteps(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, [setSteps]);

  return (
    <div>
      <div contentEditable onInput={handleChange} onBlur={handleBlur}>
        {todo.value}
      </div>
      <div>
        <ArrowDownCircleFill onClick={handleClick} />
      </div>
      {isClicked && (
        <div>
          <div>
            <StepForm setSteps={setSteps} id={todo_id} />
          </div>
          <div>
            {steps.map((step) => {
              return (
                <Steps
                  step={step}
                  setSteps={setSteps}
                  todoid={todo_id}
                  step_id={step.id}
                  key={step.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
