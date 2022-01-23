import React, { useState } from "react";
import ListInput from "./ListInput";
import List from "./List";
import "./body.scss";
import sunIcon from "../images/icon-sun.svg";
import moonIcon from "../images/icon-moon.svg";

export default function Body() {
  const [todos, setTodos] = useState([]);
  const [hiddenList, setHiddenList] = useState([]);
  const [currentlyActive, setCurrentlyActive] = useState("currentlyAll");

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    const newHiddenTodo = [todo, ...hiddenList];
    setHiddenList(newHiddenTodo);
  };

  const handleRemove = (id) => {
    console.log(id);
    const remove = [...todos].filter((todo) => todo.id !== id);
    setTodos(remove);
  };

  const setAll = () => {
    if (currentlyActive === "currentlyAll") {
      return;
    }

    setTodos(hiddenList);
    setCurrentlyActive("currentlyAll");
    setHiddenList([]);
  };

  const setActive = () => {
    const active = [...todos].filter((todo) => !todo.complete);

    if (currentlyActive === "currentlyActive") {
      return;
    } else if (currentlyActive === "currentlyComplete") {
      // As the 'hidden list' only changes state
      const reverseList = [...hiddenList].filter((item) => !item.complete);
      setTodos(reverseList);
      setCurrentlyActive("currentlyActive");
    } else {
      // store full list
      setHiddenList(todos);
      // showcase list
      setTodos(active);
      setCurrentlyActive("currentlyActive");
    }
  };

  const setComplete = () => {
    const complete = [...todos].filter((todo) => todo.complete);

    if (currentlyActive === "currentlyComplete") {
      return;
    } else if (currentlyActive === "currentlyActive") {
      const reverseList = [...hiddenList].filter((item) => item.complete);
      setTodos(reverseList);
      setCurrentlyActive("currentlyComplete");
    } else {
      // store full list
      setHiddenList(todos);

      // showcase list
      setTodos(complete);

      setCurrentlyActive("currentlyComplete");
    }
  };

  const clearCompleted = () => {
    if (currentlyActive === "currentlyComplete") {
      setCurrentlyActive("currentlyAll");
      const filter = [...hiddenList].filter((item) => !item.complete);
      setTodos(filter);
    } else if (currentlyActive === "currentlyActive") {
      setCurrentlyActive("currentlyAll");
      const filterCompleted = [...todos].filter((item) => !item.complete);
      setTodos(filterCompleted);
    } else {
      const filterCompleted = [...todos].filter((item) => !item.complete);
      setTodos(filterCompleted);
    }
  };

  const [dark, setDark] = useState(true);
  const setTheme = () => {
    setDark(() => !dark);
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="app">
        <div className="body">
          <header>
            <h1>TODO</h1>
            {dark ? (
              <img
                onClick={setTheme}
                src={sunIcon}
                alt="light/dark theme button"
              />
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
              currentlyActive={currentlyActive}
              clearCompleted={clearCompleted}
            />
          </div>
          <p className="reorder">Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}
