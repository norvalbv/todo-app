import React, { useState } from "react";
import ListInput from "./ListInput";
import List from "./List";
import "./body.scss";
import sunIcon from "../images/icon-sun.svg";
import moonIcon from "../images/icon-moon.svg";

export default function Body() {
  const [todos, setTodos] = useState([]);

  // const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const handleRemove = (id) => {
    console.log(id);
    const remove = [...todos].filter((todo) => todo.id !== id);
    setTodos(remove);
  };

  const setAll = () => {
    console.log(todos)
    setTodos(todos);
  };

  const setActive = () => {
    const active = [...todos].filter((todo) => !todo.complete);
    console.log(active);
    setTodos(active);
  };

  const setComplete = () => {
    const active = [...todos].filter((todo) => todo.complete);
    console.log(active);
    setTodos(active);
  };

  return (
    <div className="body">
      <header>
        <h1>TODO</h1>
        <img src={moonIcon} alt="light/dark theme button" />
      </header>
      <div className="todo-container">
        <ListInput onSubmit={addTodo} setTodos={setTodos} />
        <List
          todos={todos}
          setTodos={setTodos}
          handleRemove={handleRemove}
          listNum={todos.length}
          setActive={setActive}
          setAll={setAll}
          setComplete={setComplete}
        />
      </div>
      <p className="comment">Drag and drop to reorder list</p>
    </div>
  );
}
