import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/slices/todoSlice.js";
import "../SCSS/AddForm.scss";

const AddForm = () => {
  const dispatch = useDispatch();
  const [isShowInputs, setIsShowInputs] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [isCheckInput, setIsCheckInput] = useState(false);
  const [isWrongLength, setIsWrongLength] = useState(false);

  const nameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const descInputChange = (e) => {
    setDescInput(e.target.value);
  };

  const checkInputHandler = () => {
    setIsCheckInput(!isCheckInput);
  };

  const cancelHandler = () => {
    setIsShowInputs(!isShowInputs);
    setIsWrongLength(false);
  };

  const addTodoHandler = () => {
    setIsWrongLength(false);
    if (isShowInputs) {
      if (
        nameInput.length > 2 &&
        nameInput.length < 20 &&
        descInput.length < 50
      ) {
        dispatch(
          addTodo({
            id: Math.random().toString(36).substr(2, 9),
            title: nameInput,
            description: descInput,
            checked: isCheckInput,
          })
        );

        setNameInput("");
        setDescInput("");
        setIsCheckInput(false);

        return;
      } else {
        setIsWrongLength(true);
      }
    }
    setIsShowInputs(true);
  };

  return (
    <>
      {isWrongLength && <p>Wrong length of name or description</p>}
      <div className="add-todo-container">
        {isShowInputs && (
          <div className="form">
            <input
              type="text"
              placeholder="Name"
              onChange={nameInputChange}
              value={nameInput}
              className="form__input"
            />
            <input
              type="text"
              placeholder="Description"
              onChange={descInputChange}
              value={descInput}
              className="form__input"
            />
            <div>
              <input
                type="checkbox"
                checked={isCheckInput}
                onChange={checkInputHandler}
                className="form__input"
              />
              <span>Completed</span>
            </div>
          </div>
        )}
        <div className="buttons-container">
          <button
            className="buttons-container__button"
            onClick={addTodoHandler}
          >
            Add ToDo
          </button>
          {isShowInputs && (
            <button
              onClick={cancelHandler}
              className="buttons-container__button buttons-container__button_close"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddForm;
