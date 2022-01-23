import React, { useState } from "react";
import ListInput from "./ListInput";
import List from "./List";
import "./body.scss";
import sunIcon from "../images/icon-sun.svg";
import moonIcon from "../images/icon-moon.svg";

export default function Body() {
  const [todos, setTodos] = useState([]);
  const [hiddenList, setHiddenList] = useState([]);

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
    setTodos(hiddenList);
  };

  const setActive = () => {
    const active = [...todos].filter((todo) => !todo.complete);
    if (active.length < hiddenList.length) {
      setTodos(hiddenList);
    }

    // store full list
    setHiddenList(todos);

    // showcase list
    setTodos(active);
  };

  const setComplete = () => {
    const complete = [...todos].filter((todo) => todo.complete);

    if (complete.length < hiddenList.length) {
      setTodos(hiddenList);
    }

    // store full list
    setHiddenList(todos);

    // showcase list
    setTodos(complete);
  };

  const [dark, setDark] = useState(true);
  const setTheme = () => {
    setDark(() => !dark);
  };

  return (
    <div className={dark ? "body dark" : "body light"}>
      <header>
        <h1>TODO</h1>
        {dark ? (
          <img onClick={setTheme} src={sunIcon} alt="light/dark theme button" />
        ) : (
          <img
            onClick={setTheme}
            src={moonIcon}
            alt="light/dark theme button"
          />
        )}
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
      <p className="reorder">Drag and drop to reorder list</p>
    </div>
  );
}
