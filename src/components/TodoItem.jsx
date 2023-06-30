import TodoItemCheckBox from "./TodoItemCheckBox";
import TodoItemDeleteButton from "./TodoItemDeleteButton";
import TodoItemDescription from "./TodoItemDescription";

function TodoItem({
  description,
  completed,
  todoListId,
  todoItemId
}) {

  const todoItemClassName =
    (completed === false) ? "todo-item" : "todo-item todo-item-completed";
  
  return (
    <div className={todoItemClassName}>
      <TodoItemCheckBox
        completed={completed}
        todoListId={todoListId}
        todoItemId={todoItemId}
      />
      <TodoItemDescription
        description={description}
        todoListId={todoListId}
        todoItemId={todoItemId}
      />
      <TodoItemDeleteButton
        todoListId={todoListId}
        todoItemId={todoItemId}
      />
    </div>
  );
}

export default TodoItem;