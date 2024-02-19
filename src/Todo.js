import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Todo.scss";
import { LoginContext } from "./LoginContext.js";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isShowInputs, setIsShowInputs] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [isCheckInput, setIsCheckInput] = useState(false);
  const [addedTodos, setAddedTodos] = useState(0);
  const [isWrongLength, setIsWrongLength] = useState(false);
  const url = `https://kvlandriitodos.onrender.com/users`;

  const navigate = useNavigate();

  const { id } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(url + `/${id}`)
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addedTodos, id]);

  const addTodoHandler = () => {
    setIsWrongLength(false);
    if (isShowInputs) {
      if (
        nameInput.length > 2 &&
        nameInput.length < 20 &&
        descInput.length < 50
      ) {
        axios
          .patch(url + `/${id}`, {
            todos: [
              ...todos,
              {
                id: Math.random().toString(36).substr(2, 9),
                title: nameInput,
                description: descInput,
                checked: isCheckInput,
                creationDate: new Date().toUTCString(),
              },
            ],
          })
          .then(() => {
            setAddedTodos((prev) => {
              return prev + 1;
            });
          })
          .catch((error) => {
            console.log(error);
          });
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

  const handleDelete = (_, index) => {
    const newTodos = todos.filter((_, i) => {
      return i !== index;
    });
    axios
      .patch(url + `/${id}`, {
        todos: newTodos,
      })
      .then(() => {
        setTodos(newTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
  };

  const handleEdit = (item) => {
    navigate(`/todo-list/edit`, { state: { todos, item } });
  };

  return (
    <>
      <div className="add-todo-container">
        {isShowInputs && (
          <div className="form">
            {isWrongLength && <p>Wrong length of name or description</p>}
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

      {todos.map((item, index) => (
        <div key={item.id} className="todo-container">
          <div className={`todo-info ${item.checked ? `completed` : ``}`}>
            <p>{index + 1}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>

          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item, index)}>Delete</button>
        </div>
      ))}
      {!todos.length && <p>There are no todos yet</p>}
    </>
  );
};

export default Todos;
