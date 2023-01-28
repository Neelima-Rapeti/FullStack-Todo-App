import React from "react";
import Steps from "./Steps";
import { useEffect, useState } from "react";
import axios from "axios";
import StepForm from "./StepForm";
import { ArrowDownCircleFill } from "react-bootstrap-icons";
import {
  CheckCircle,
  Icon1Circle,
  Icon2Circle,
  Icon3Circle,
  Icon4Circle,
  Icon5Circle,
} from "react-bootstrap-icons";

export default function Todo({ todo, todo_id, setTodos, todos }) {
  const [isClicked, setIsClicked] = useState(false);
  const [steps, setSteps] = useState([]);
  const [value, setValue] = useState(`${todo.value}`);
  const [prio, setPrio] = useState(`${todo.priority}`);
  const [time, setTime] = useState(`${todo.deadline}`);
  const [status, setStatus] = useState();

  function handleChange(e) {
    setValue(e.target.innerHTML);
  }

  function handleChangePrio(e) {
    setPrio(e.target.innerHTML);
  }

  function handleChangeTime(e) {
    setTime(
      e.target.innerHTML.substring(0, 10) +
        "T" +
        e.target.innerHTML.substring(14, 22) +
        ".000Z"
    );
    console.log(time);
  }

  const putData = {
    value: value,
    status: status,
    deadline: time,
    priority: prio,
    created_at: new Date(),
  };

  function putTodo() {
    axios.put(`http://localhost:4040/todos/${todo_id}`, putData).then((res) => {
      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id === res.data.id) {
            return res.data;
          } else {
            return todo;
          }
        });
      });
    });
  }
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleBlur = () => {
    putTodo();
  };

  const handleClickDone = () => {
    setStatus(!status);
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
  }, []);

  function deleteTodo(id, e) {
    axios.delete(`http://localhost:4040/todos/${id}`).then((res) => {
      const deltodos = todos.filter((todo) => todo.id !== id);
      setTodos(deltodos);
    });
  }
  return (
    <div className="icons">
      {todo.priority === 1 && <Icon1Circle />}
      {todo.priority === 2 && <Icon2Circle />}
      {todo.priority === 3 && <Icon3Circle />}
      {todo.priority === 4 && <Icon4Circle />}
      {todo.priority === 5 && <Icon5Circle />}
      <div
        contentEditable
        onInput={handleChange}
        onBlur={handleBlur}
        className="todoTextDiv"
      >
        {todo.value}
      </div>

      <div>
        <button onClick={(e) => deleteTodo(todo.id, e)}>Delete</button>
      </div>
      <div>
        <ArrowDownCircleFill onClick={handleClick} />
      </div>
      <div>
        <CheckCircle onClick={handleClickDone} />
      </div>

      {isClicked && (
        <div>
          <div contentEditable onInput={handleChangePrio} onBlur={handleBlur}>
            {todo.priority}
          </div>
          <div contentEditable onInput={handleChangeTime} onBlur={handleBlur}>
            {todo.deadline.substring(0, 10)} at{" "}
            {todo.deadline.substring(11, 19)}
          </div>
          <div>
            <StepForm steps={steps} setSteps={setSteps} id={todo_id} />
          </div>
          <div>
            {steps.map((step) => {
              return (
                <Steps
                  steps={steps}
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
