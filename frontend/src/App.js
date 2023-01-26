import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Components/Form"

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
  }, [setTodos]);

  return (
    <div className="App">

      <h1>ToDoList🤓</h1>
      <Form setTodos={setTodos} />
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
