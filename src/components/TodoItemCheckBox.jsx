import { useContext } from "react";

// context
import { AllTodosContext } from "../contexts/AllTodosContext";

// utility
import { getTodoIndexes } from "../../utility/getTodoIndexes";
import { sortAllTodos } from "../../utility/sortAllTodos";

function TodoItemCheckBox({
  completed,
  todoListId,
  todoItemId,
}) {

  const { allTodos, setAllTodos } = useContext(AllTodosContext);

  function handleCheckBoxUpdate() {
    const allTodosCopy = [...allTodos];
    const { todoListIdIndexToUpdate, todoItemIdIndexToUpdate } =
      getTodoIndexes(allTodosCopy, todoListId, todoItemId);

    allTodosCopy[todoListIdIndexToUpdate]['todo_items'][todoItemIdIndexToUpdate]['completed'] =
      !completed;

    sortAllTodos(
      allTodosCopy,
      todoListIdIndexToUpdate,
      todoItemIdIndexToUpdate,
      !completed
    );

    setAllTodos(allTodosCopy);
  }

  return (
    <input
      type="checkbox"
      name={`checkbox-${todoItemId}`}
      checked={completed}
      onChange={handleCheckBoxUpdate}
    />
  );
}

export default TodoItemCheckBox;