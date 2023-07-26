import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// context
import { AllTodosContext } from "../contexts/AllTodosContext.js";
import TodoListCard from "./TodoListCard.jsx";
import AddTodoListButton from "./AddTodoListButton.jsx";

function AllTodos() {

  let {
    allTodos,
    setAllTodos,
    username
  } = useContext(AllTodosContext);
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
        author: username,
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
          <TodoListCard title={todoListObj.title} />
        </Link>
      ))
      }

      {/* <button
        onClick={handleAddTodoList}
        className="todo-list-card add-todo-list-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
      </button> */}
      <AddTodoListButton onClickHandler={handleAddTodoList} />
    </div >
  );
}

export default AllTodos;