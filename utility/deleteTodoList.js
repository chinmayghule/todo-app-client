function deleteTodoList(
  allTodosCopy,
  todoListId
) {

  const todoListIndexToDelete =
    allTodosCopy
      .findIndex(
        todoListObj =>
          (todoListObj.todo_list_id === todoListId)
      );

  allTodosCopy.splice(todoListIndexToDelete, 1);

  return allTodosCopy;

}


export { deleteTodoList };