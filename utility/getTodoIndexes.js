function getTodoIndexes(allTodos, todoListId, todoItemId) {
  const todoListIdIndexToUpdate =
    allTodos.findIndex(todoListObj =>
      (todoListObj.todo_list_id === todoListId)
    );

  const todoItemIdIndexToUpdate =
    allTodos[todoListIdIndexToUpdate]
      .todo_items
      .findIndex(todoItemObj =>
        (todoItemObj.id === todoItemId)
      );

  return {
    todoListIdIndexToUpdate: todoListIdIndexToUpdate,
    todoItemIdIndexToUpdate: todoItemIdIndexToUpdate
  };
}

export { getTodoIndexes };