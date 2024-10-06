import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useForm } from 'react-hook-form';

type TodoTypes = {
  id: string;
  todo: string;
};

type AddTodoType = {
  todo: string;
}

function App() {
  const { register, handleSubmit } = useForm<AddTodoType>()
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  const addTodo = async (event: AddTodoType) => {
    const { todo } = event
    console.log(todo);
    // サーバーにPOSTリクエストを送信;
    await axios
      .post("http://localhost:3000/add", {
        data: {
          todo,
        },
      })
      .then((response) => {
        console.log(response.data);
        // 新しいTODOを取得
        const todo = response.data;
        setTodos((preTodos) => [todo, ...preTodos]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteTodo = async (id: string) => {
    console.log(id);

    await axios
      .delete("http://localhost:3000/delete", {
        data: {
          id,
        },
      })
      .then((response) => {
        console.log(response)
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((e) => {
        console.log(e.message);
        setTodos(todos);
      });
  }

  // サーバーにGETリクエストを送信
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
      <form onSubmit={handleSubmit(addTodo)}>
        <input {...register("todo")} type="text" />
        <button type='submit'>add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: "flex" }}>
          <p>{todo.todo}</p>
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default App
