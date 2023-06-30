import { useContext } from "react";

// context
import { AllTodosContext } from "../contexts/AllTodosContext";

// utility
import { deleteTodoList } from "../../utility/deleteTodoList";
import { useNavigate } from "react-router-dom";


function TodoListDeleteButton({ todoListId }) {
  
  const { allTodos, setAllTodos } = useContext(AllTodosContext);
  const navigate = useNavigate();
  
  function handleTodoListDelete() {
    const updatedAllTodos =
      deleteTodoList(
        [...allTodos],
        todoListId
      );

    setAllTodos(updatedAllTodos);
    navigate('/todos');
  }
  
  return (
    <button
      className="todo-delete-button todo-list-delete-button"
      onClick={handleTodoListDelete}
    >
      &#10006;
    </button>
  );
}

export default TodoListDeleteButton;