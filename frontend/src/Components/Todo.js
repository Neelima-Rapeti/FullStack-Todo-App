import React from "react";
import Steps from "./Steps";
import { useEffect, useState } from "react";
import axios from "axios";
import StepForm from "./StepForm";

export default function Todo({ todo, todo_id }) {
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

  return (
    <div>
      <div key={todo.id}>
        <h5 onClick={handleClick}>{todo.value}</h5>
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
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
