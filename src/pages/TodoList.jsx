import { useParams } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useContext, useState } from "react";

// components
import TodoItem from "../components/TodoItem";
import AddTodoItem from "../components/AddTodoItem";
import TodoListDeleteButton from "../components/TodoListDeleteButton";

// external components
import TextareaAutosize from "react-textarea-autosize";

// contexts
import { AllTodosContext } from "../contexts/AllTodosContext";


function TodoList() {

  const { todoListId } = useParams();
  const { allTodos, setAllTodos } = useContext(AllTodosContext);

  // const todoListIndex =
  //   allTodos.findIndex(todoListObj =>
  //     (todoListObj.todo_list_id === todoListId)
  //   );

  // const title = allTodos[todoListIndex]['title'];
  // const todoItems = allTodos[todoListIndex]['todo_items'];

  const todoListIndex =
    allTodos.findIndex(todoListObj =>
      (todoListObj.todo_list_id === todoListId)
    );

  // if(todoListIndex === -1) {
  //   return (<div>Loading...</div>);
  // }

  // const title = allTodos[todoListIndex]['title'] || "(untitled)";
  // const todoItems = allTodos[todoListIndex]['todo_items'] || [];

  const title =
    (todoListIndex !== -1) ? (
      allTodos[todoListIndex]['title']

    ) : (
      "(untitled)"
    );

  const todoItems =
    (todoListIndex !== -1) ? (
      allTodos[todoListIndex]['todo_items']

    ) : (
      []
    );

  const [
    isTodoListTitleEditing,
    setIsTodoListTitleEditing
  ] = useState(false);

  const [
    todoListInputValue,
    setTodoListInputValue
  ] = useState(title);

  const todoListTitleRef =
    useDetectClickOutside({
      onTriggered: handleOutsideClick
    });

  let todoListTitleJSX;

  if (isTodoListTitleEditing) {
    todoListTitleJSX = (
      <TextareaAutosize
        type="text"
        value={todoListInputValue}
        onChange={handleInputChange}
        onBlur={handleTitleBlur}
        tabIndex={0}
        autoFocus
      />
    );

  } else {
    todoListTitleJSX = title;
  }

  let todoListCompletedTextJSX;
  // const totalCompletedTodoItems =
  //   allTodos[todoListIndex]["todo_items"]
  //     .filter(todoItemObj => (todoItemObj.completed === true))
  //     .length;

  const totalCompletedTodoItems =
    (todoListIndex !== -1) ? (
      allTodos[todoListIndex]["todo_items"]
        .filter(todoItemObj => (todoItemObj.completed === true))
        .length

    ) : (
      0
    );




  if (totalCompletedTodoItems > 0) {
    todoListCompletedTextJSX = (
      <div className="todo-list-completed-text">
        Completed
      </div>
    );

  } else {
    null;
  }


  function handleTitleClick() {
    setIsTodoListTitleEditing(true);
  }

  function handleInputChange(event) {
    setTodoListInputValue(event.target.value);
  }

  function handleOutsideClick() {
    if (isTodoListTitleEditing) {

      handleTodoItemTitleUpdate(todoListInputValue);
      setIsTodoListTitleEditing(false);
    }
  }

  function handleTodoItemTitleUpdate(todoListInputValue) {
    const allTodosCopy = [...allTodos];

    allTodosCopy[todoListIndex]['title'] =
      (todoListInputValue.length === 0) ? "(untitled)" : todoListInputValue;

    setAllTodos(allTodosCopy);
  }

  function handleTitleFocus() {
    setIsTodoListTitleEditing(true);
  }

  function handleTitleBlur() {
    if (isTodoListTitleEditing) {
      handleTodoItemTitleUpdate(todoListInputValue);
      setIsTodoListTitleEditing(false);
    }
  }


  return (
    <div className="todo-list-container">
      <div className="todo-list-title-container">
        <div
          className="todo-list-title"
          ref={todoListTitleRef}
          onClick={handleTitleClick}

          onFocus={handleTitleFocus}
          tabIndex={0}
        >
          {todoListTitleJSX}
        </div>

        <TodoListDeleteButton
          todoListId={todoListId}
        />
      </div>

      <div className="todo-list-items-container">
        <div className="todo-list-unchecked-items">
          {todoItems
            .filter(todoItemsObj => (todoItemsObj.completed === false))
            .map(todoItemsObj => (
              <TodoItem
                key={todoItemsObj.id}
                description={todoItemsObj.description}
                completed={todoItemsObj.completed}
                todoListId={todoListId}
                todoItemId={todoItemsObj.id}
              />
            ))}
        </div>

        {todoListCompletedTextJSX}

        <div className="todo-list-checked-items">
          {todoItems
            .filter(todoItemsObj => (todoItemsObj.completed === true))
            .map(todoItemsObj => (
              <TodoItem
                key={todoItemsObj.id}
                description={todoItemsObj.description}
                completed={todoItemsObj.completed}
                todoListId={todoListId}
                todoItemId={todoItemsObj.id}
              />
            ))}
        </div>
      </div>

      <AddTodoItem todoListIndex={todoListIndex} />

    </div>
  );
}

export default TodoList;