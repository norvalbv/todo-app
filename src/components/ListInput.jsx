import React, { useState } from "react";
import check from "../images/icon-check.svg";
import "./listinput.scss";

export default function ListItem({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Math.random(),
      text: input,
      complete: false
    });
    setInput("");
  };

  return (
    <div className="listinput">
      <div className="upper">
        <form onSubmit={handleSubmit} className="todo-input">
          <img src={check} alt="check box" className="checkbox" />
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            // ref={inputRef}
            className=" todo-input edit"
            
          />
        </form>
      </div>
      {/* <button onClick={() => setTodos([])}>Reset List</button> */}
    </div>
  );
}
