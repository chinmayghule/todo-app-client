// utility
import { getTodoIndexes } from "./getTodoIndexes";

function deleteTodoItem(
  allTodosCopy,
  todoListId,
  todoItemId
) {

  const { todoListIdIndexToUpdate, todoItemIdIndexToUpdate } =
    getTodoIndexes(allTodosCopy, todoListId, todoItemId);

  allTodosCopy[todoListIdIndexToUpdate]
    .todo_items
    .splice(todoItemIdIndexToUpdate, 1);

  return allTodosCopy;

}


export { deleteTodoItem };