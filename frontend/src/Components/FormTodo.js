import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsCalendar2PlusFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormTodo({ setTodos, todos }) {
  const [value, setValue] = useState("");
  const [prio, setPrio] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [clicked, setIsClicked] = useState(false);

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
        return [res.data, ...todos];
      });

      toast.success("Success! Todo was added.");
    });
  }

  const addForm = () => {
    setIsClicked(!clicked);
  };

  return (
    <>
      <BsCalendar2PlusFill onClick={addForm} className="fs-2 mb-4 headerIcon" />
      <div className="mx-auto">
        {clicked && (
          <div>
            <Form className="w-50 flex-column mx-auto">
              <Form.Group className="d-flex align-items-center mb-3">
                <Form.Label className="mt-1 w-75 headerText">
                  Priority:
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1-5"
                  onChange={handleChangePrio}
                  min="1"
                  max="5"
                  className=""
                />
              </Form.Group>

              <Form.Group className="d-flex align-items-center mb-3">
                <Form.Label className="mt-1 w-75 headerText">
                  Description:
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChangeValue}
                  placeholder=".."
                />
              </Form.Group>

              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mt-1 w-75 headerText">
                  Deadline:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=".."
                  onChange={handleChangeFinishDate}
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </Form.Group>

              <div className="mt-2 fs-2 py-3 d-flex justify-content-end headerText">
                <AiOutlinePlusCircle onClick={clickHander} />
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}

export default FormTodo;
