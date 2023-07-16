import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import { AllTodosContext } from "../contexts/AllTodosContext.js";

function AllTodos() {

  const { allTodos, setAllTodos } = useContext(AllTodosContext);
  const navigate = useNavigate();

  function handleAddTodoList() {
    // do something
    const newTodoListObj = {
      title: "(untitled)",
      author: "falana",
      todo_list_id: crypto.randomUUID(),
      todo_items: [],
    };

    // const updatedAllTodos = [...allTodos, newTodoListObj];
    let updatedAllTodos;

    if (allTodos === null || allTodos === undefined) {
      updatedAllTodos = [newTodoListObj];
    } else {
      updatedAllTodos = [...allTodos, newTodoListObj];
    }

    setAllTodos(updatedAllTodos);
    navigate(`/todos/${newTodoListObj.todo_list_id}`);
  }


  return (
    <div className="all-todos-container">
      {allTodos?.map(todoListObj => (
        <Link
          to={todoListObj.todo_list_id}
          className="todo-list-card-link"
          key={todoListObj.todo_list_id}
        >
          <div
            className="todo-list-card"
          >
            <div className="todo-list-card">
              {todoListObj.title}
            </div>
          </div>
        </Link>
      ))
      }

      <button
        onClick={handleAddTodoList}
        className="todo-list-card add-todo-list-btn"
      >
        &#43;
      </button>
    </div >
  );
}

export default AllTodos;