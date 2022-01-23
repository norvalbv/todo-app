import cross from "../images/icon-cross.svg";
import "./list.css";

export default function List({
  todos,
  setTodos,
  handleRemove,
  listNum,
  setActive,
  setAll,
  setComplete,
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
    <div style={{ paddingBottom: "2.5rem" }}>
      {todos.map(({ text, id, complete }) => (
        <div key={id} className="list">
          <div
            className={complete ? "complete" : null}
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
      <div className="bottom">
        <div className="left">
          <p>{listNum} Items Left</p>
        </div>
        <div className="middle">
          <button className="sorting" onClick={() => setAll()}>
            All
          </button>
          <button className="sorting" onClick={() => setActive()}>
            Active
          </button>
          <button className="sorting" onClick={() => setComplete()}>
            Completed
          </button>
        </div>
        <div className="right">
          <button className="clear-list" onClick={() => setTodos([])}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
