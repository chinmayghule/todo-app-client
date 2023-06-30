import { useContext } from "react";

// context
import { AllTodosContext } from "../contexts/AllTodosContext";

// utility
import { deleteTodoItem } from "../../utility/deleteTodoItem";


function TodoItemDeleteButton({ todoListId, todoItemId }) {
  
  const { allTodos, setAllTodos } = useContext(AllTodosContext);  
  
  function handleTodoItemDelete() {
    const updatedAllTodos =
      deleteTodoItem(
        [...allTodos],
        todoListId,
        todoItemId
      );

    setAllTodos(updatedAllTodos);
  }
  
  return (
    <button
      className="todo-delete-button"
      onClick={handleTodoItemDelete}
    >
      &#10006;
    </button>
  );
}

export default TodoItemDeleteButton;