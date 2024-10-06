import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

type TodoTypes = {
  id: string;
  todo: string;
};

function App() {
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  // バックエンドのサーバーにGETリクエストを送信
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((response) => {
        console.log(response.data.todos);
        const { todos } = response.data
        setTodos(todos);
      });
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.todo}</p>
      ))}
    </>
  )
}

export default App
