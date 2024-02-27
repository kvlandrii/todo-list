import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../store/slices/editSlice.js";
import "../SCSS/Edit.scss";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector((state) => state.edit.todo);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [checkInput, setCheckInput] = useState(false);

  const nameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const descInputChange = (e) => {
    setDescInput(e.target.value);
  };

  const checkInputHandler = () => {
    setCheckInput(!checkInput);
  };

  const handleSave = () => {
    dispatch(
      editTodo({
        id: todo.id,
        title: nameInput,
        description: descInput,
        checked: checkInput,
      })
    ).then(() => {
      navigate("/todo");
    });
  };

  useEffect(() => {
    setNameInput(todo.title);
    setDescInput(todo.description);
    setCheckInput(todo.checked);
  }, [todo]);

  return (
    <>
      <div className="edit-form">
        <input
          type="text"
          placeholder="Name"
          onChange={nameInputChange}
          value={nameInput}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={descInputChange}
          value={descInput}
        />
        <div>
          <input
            type="checkbox"
            checked={checkInput}
            onChange={checkInputHandler}
          />
          <span>Completed</span>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

export default Edit;
