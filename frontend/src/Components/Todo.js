import React from "react";
import Steps from "./Steps";
import { useEffect, useState } from "react";
import axios from "axios";
import StepForm from "./StepForm";

export default function Todo({ todo, todo_id, setTodos, todos }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const [steps, setSteps] = useState([]);

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

  function deleteTodo(id, e) {
    axios.delete(`http://localhost:4040/todos/${id}`).then((res) => {
      const deltodos = todos.filter((todo) => todo.id !== id);
      setTodos(deltodos);
    });
  }
  return (
    <div>
      <div key={todo.id}>
        <h5 onClick={handleClick}>{todo.value}</h5>
        <button onClick={(e) => deleteTodo(todo.id, e)}>Delete</button>
      </div>
      {isClicked && (
        <div>
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
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
