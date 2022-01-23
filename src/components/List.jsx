import cross from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";
import "./list.scss";

export default function List({
  todos,
  setTodos,
  handleRemove,
  listNum,
  setActive,
  setAll,
  setComplete,
  currentlyActive,
  clearCompleted
}) {
  const completeTodo = (id, complete) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !complete,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div style={{ paddingBottom: "2.5rem" }} className="list-container">
      {todos.map(({ text, id, complete }) => (
        <div key={id} className="list">
          <img
            src={check}
            alt="check box"
            className={complete ? "checkbox checkbox-complete" : "checkbox"}
            onClick={() => {
              completeTodo(id, complete);
            }}
          />
          <div
            className={complete ? "complete list-text" : "list-text"}
            onClick={() => {
              completeTodo(id, complete);
            }}
          >
            {text}
          </div>
          <img
            src={cross}
            alt=""
            className="remove"
            onClick={() => handleRemove(id)}
          />
        </div>
      ))}
      <div className="bottom-nav">
        <div className="left">
          <p className="items-left">{listNum} Items Left</p>
        </div>
        <div className="middle">
          <button
            // className="sorting"
            onClick={() => {
              setAll();
              console.log(currentlyActive);
            }}
            className={
              currentlyActive === "currentlyAll"
                ? "currentlyAll sorting"
                : "sorting"
            }
          >
            All
          </button>
          <button
            className={
              currentlyActive === "currentlyActive"
                ? "currentlyAll sorting"
                : "sorting"
            }
            onClick={() => setActive()}
          >
            Active
          </button>
          <button
            className={
              currentlyActive === "currentlyComplete"
                ? "currentlyAll sorting"
                : "sorting"
            }
            onClick={() => setComplete()}
          >
            Completed
          </button>
        </div>
        <div className="right">
          <button className="clear-list" onClick={() => clearCompleted()}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
