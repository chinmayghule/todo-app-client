function sortAllTodos(
  allTodosCopy,
  todoListIdIndexToUpdate,
  todoItemIdIndexToUpdate,
  completed
) {

  // removing and adding to the end of todo list.
  const updatedTodoItemObj =
    allTodosCopy[todoListIdIndexToUpdate]['todo_items'][todoItemIdIndexToUpdate];

  // removing updated todo item.
  allTodosCopy[todoListIdIndexToUpdate]['todo_items']
    .splice(todoItemIdIndexToUpdate, 1);


  if (completed) {
    // uncheck => checked
    // move it to the bottom of todo list.

    allTodosCopy[todoListIdIndexToUpdate]['todo_items']
      .push(updatedTodoItemObj);


  } else {
    // checked => unchecked
    // move it to the top of todo list.

    allTodosCopy[todoListIdIndexToUpdate]['todo_items']
    .unshift(updatedTodoItemObj);

  }

}


export { sortAllTodos };