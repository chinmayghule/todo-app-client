import { useContext, useState } from "react";

// contexts
import { AllTodosContext } from "../contexts/AllTodosContext";

// external components
import TextareaAutosize from "react-textarea-autosize";


function AddTodoItem({ todoListIndex }) {

  const { allTodos, setAllTodos } = useContext(AllTodosContext);
  const [
    addTodoTextareaInputValue,
    setAddTodoTextareaInputValue
  ] = useState("");


  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    addTodoItemToLocalState(e.target.value);
    setAddTodoTextareaInputValue("");
  }

  function addTodoItemToLocalState(newTodoItemText) {
    const allTodosCopy = [...allTodos];
    const newTodoItemObj = {
      id: crypto.randomUUID(),
      description: newTodoItemText,
      completed: false,
    };

    allTodosCopy[todoListIndex]?.todo_items
      .push(newTodoItemObj);

    setAllTodos(allTodosCopy);
  }


  return (
    <div className="add-todo-item-wrapper">
      <TextareaAutosize
        className="add-todo-item-textarea"
        onKeyDown={handleKeyDown}
        cols="70"
        rows="1"
        placeholder="Add a todo..."
        value={addTodoTextareaInputValue}
        onChange={(e) => setAddTodoTextareaInputValue(e.target.value)}
        autoFocus
      />
    </div>
  );
}

export default AddTodoItem;