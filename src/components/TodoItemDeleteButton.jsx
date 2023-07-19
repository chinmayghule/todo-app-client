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
      <svg xmlns="http://www.w3.org/2000/svg" height="1.125em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
    </button>
  );
}

export default TodoItemDeleteButton;