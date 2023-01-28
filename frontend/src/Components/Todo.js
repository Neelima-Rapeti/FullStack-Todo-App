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
import Moment from "react-moment";
import { BsTrash } from "react-icons/bs";

export default function Todo({ todo, todo_id, setTodos, todos }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedDone, setClickedDone] = useState(false);
  const [steps, setSteps] = useState([]);
  const [value, setValue] = useState(`${todo.value}`);
  const [prio, setPrio] = useState(`${todo.priority}`);
  const [time, setTime] = useState(`${todo.deadline}`);
  const [status, setStatus] = useState(`${todo.status}`);

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
    console.log("click done todo");
    setClickedDone(!isClickedDone);
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
    <div className="m-2">
      <div className="d-flex justify-content-between fs-5">
        <div className="d-flex">
          <div className="pe-2">
            {todo.priority === 1 && <Icon1Circle className="text-danger" />}
            {todo.priority === 2 && <Icon2Circle className="text-warning" />}
            {todo.priority === 3 && <Icon3Circle className="text-success" />}
            {todo.priority === 4 && <Icon4Circle className="text-primary" />}
            {todo.priority === 5 && <Icon5Circle className="" />}
          </div>
          <div
            contentEditable
            onInput={handleChange}
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
            style={{
              textDecorationLine: isClickedDone ? "line-through" : "none",
            }}
          >
            {todo.value}
          </div>
        </div>
        <div className="d-flex">
          <div className="pe-2">
            <ArrowDownCircleFill onClick={handleClick} />
          </div>
          <div className="pe-2">
            <CheckCircle onClick={handleClickDone} />
          </div>
          <div>
            <BsTrash onClick={(e) => deleteTodo(todo.id, e)} />
          </div>
        </div>
      </div>
      <div className="bord my-2">
        {isClicked && (
          <div className="fs-6 w-75 mx-auto">
            {/* <div
              contentEditable
              onInput={handleChangePrio}
              onBlur={handleBlur}
              suppressContentEditableWarning={true}
            >
              {todo.priority}
            </div> */}
            <p className="mt-2">
              Deadline{" "}
              <Moment fromNow className="date fs-6">
                {todo.deadline}
              </Moment>
            </p>

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
    </div>
  );
}
