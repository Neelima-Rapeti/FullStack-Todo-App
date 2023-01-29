import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FormTodo from "./Components/FormTodo";
import Todo from "./Components/Todo";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("http://localhost:4040/todos");
        setTodos(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  return (
    <div className="App bg-light py-5">
      <div className="">
        <div className="mx-auto pt-4 heading ">
          <h1 className="headerText mb-4">My Planner</h1>
          <FormTodo setTodos={setTodos} />
        </div>
        <div className="todoWrapDiv">
          {todos.map((todo) => {
            return (
              <Todo
                todo={todo}
                todo_id={todo.id}
                setTodos={setTodos}
                todos={todos}
                key={todo.id}
              />
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
