import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Components/Form";
import Todo from "./Components/Todo";

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
    <div className="App">
      <div>
        <h1>ToDoList🤓</h1>
        <Form setTodos={setTodos} />
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
  );
}

export default App;
