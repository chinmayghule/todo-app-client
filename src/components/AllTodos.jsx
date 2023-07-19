import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// context
import { AllTodosContext } from "../contexts/AllTodosContext.js";

function AllTodos() {

  let { allTodos, setAllTodos } = useContext(AllTodosContext);
  const navigate = useNavigate();

  // fix empty allTodos problem.
  if (Array.isArray(allTodos) === false) {
    allTodos = [];
  }

  function handleAddTodoList() {
    // do something
    let newTodoListObj;

    try {
      newTodoListObj = {
        title: "(untitled)",
        author: "falana",
        todo_list_id: uuidv4(),
        todo_items: [],
      };

    } catch (err) {
      alert(err);
    }

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
      {(allTodos?.length > 0) && allTodos?.map(todoListObj => (
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