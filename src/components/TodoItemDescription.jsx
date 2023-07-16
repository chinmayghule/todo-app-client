import { useContext, useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

// context
import { AllTodosContext } from "../contexts/AllTodosContext";

// utility
import { getTodoIndexes } from "../../utility/getTodoIndexes";

// external components
import TextareaAutosize from "react-textarea-autosize";


function TodoItemDescription({
  description,
  todoListId,
  todoItemId,
}) {

  // context
  const { allTodos, setAllTodos } = useContext(AllTodosContext);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(description);

  // refs
  const ref = useDetectClickOutside({ onTriggered: handleOutsideClick });

  let todoDescriptionJSX;

  if (isEditing) {
    todoDescriptionJSX = (
      <TextareaAutosize
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleTodoTextBlur}
        tabIndex={0}
        autoFocus
      />
    );

  } else {
    todoDescriptionJSX = description;
  }


  function handleDescriptionClick() {
    setIsEditing(true);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleOutsideClick() {
    if (isEditing) {
      handleTodoItemDescriptionUpdate(inputValue);
      setIsEditing(false);
    }
  }

  function handleTodoItemDescriptionUpdate(inputValue) {
    const allTodosCopy = [...allTodos];
    const { todoListIdIndexToUpdate, todoItemIdIndexToUpdate } =
      getTodoIndexes(allTodosCopy, todoListId, todoItemId);

    allTodosCopy[todoListIdIndexToUpdate]['todo_items'][todoItemIdIndexToUpdate]['description'] =
      inputValue;

    setAllTodos(allTodosCopy);
  }

  function handleTodoTextFocus() {
    setIsEditing(true);
  }

  function handleTodoTextBlur(e) {
    if (isEditing) {
      handleTodoItemDescriptionUpdate(inputValue);
      setIsEditing(false);
    }
  }


  useEffect(() => {
    const handleKeyDown = (e) => {

      const isTodoItemTextInput = (
        Boolean(
          e.target
            ?.closest('.todo-item-description')
        )
      );

      const trigger =
        (e.target.nodeName.toLowerCase() === 'textarea') &&
        (e.target.type === 'textarea');

      if (trigger) {
        if (e.shiftKey && e.key === 'Tab') {
          e.preventDefault();


          if (isTodoItemTextInput) {
            e.target
              ?.closest('.todo-item')
              ?.querySelector('input[type=checkbox]')
              ?.focus();

          } else {
            e.target
              ?.closest('.todos-wrapper')
              ?.querySelector('.signout-btn')
              ?.focus();
          }

        }
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, []);


  return (
    <div
      className="todo-item-description"
      ref={ref}
      onClick={handleDescriptionClick}

      onFocus={handleTodoTextFocus}
      tabIndex={0}
    >
      {todoDescriptionJSX}
    </div>
  );
}

export default TodoItemDescription;