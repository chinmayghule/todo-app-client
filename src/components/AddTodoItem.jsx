import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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


    // keyCode 13 === 'Enter' key
    if (e.keyCode === 13) {
      e.preventDefault();

      if (e.target.value.length === 0) return;

      addTodoItemToLocalState(e.target.value);
      setAddTodoTextareaInputValue("");
    }
  }

  function addTodoItemToLocalState(newTodoItemText) {
    const allTodosCopy = [...allTodos];
    const newTodoItemObj = {
      id: uuidv4(),
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
        minLength={1}
        value={addTodoTextareaInputValue}
        onChange={(e) => setAddTodoTextareaInputValue(e.target.value)}
      />
    </div>
  );
}

export default AddTodoItem;