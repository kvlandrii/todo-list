import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Edit.scss";
import { LoginContext } from "./LoginContext";

const Edit = () => {
  const { todos, item } = useLocation().state;
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [checkInput, setCheckInput] = useState(false);
  const { id } = useContext(LoginContext);
  const url = `https://kvlandriitodos.onrender.com/users`;

  useEffect(() => {
    setNameInput(item.title);
    setDescInput(item.description);
    setCheckInput(item.checked);
  }, [item]);

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
    const updatedTodos = todos.map((todo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          title: nameInput,
          description: descInput,
          checked: checkInput,
        };
      }
      return todo;
    });

    axios
      .patch(url + `/${id}`, {
        todos: updatedTodos,
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
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
      <Link to="/todo-list/todo">
        <button onClick={handleSave}>Save</button>
      </Link>
    </div>
  );
};

export default Edit;
