import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";
export default function StepForm({ steps, setSteps, id }) {
  const [value, setValue] = useState([]);
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
      <Form className="d-flex align-items-center mb-3">
        <div className="d-flex w-50">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder={steps.length + 1}
              onChange={handleChangeNum}
            />
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div className="d-flex fs-4 ms-4">
          <AiOutlinePlusCircle onClick={clickHander} />
        </div>
      </Form>
    </>
  );
}
