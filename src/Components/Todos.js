import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompleted,
  getTodos,
  deleteTodo,
} from "../store/slices/todoSlice.js";
import { setTodo } from "../store/slices/editSlice.js";
import "../SCSS/Todos.scss";

const Todos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxTodos = useSelector((state) => state.todos.todos);
  const { addedTodos, status } = useSelector((state) => state.todos);
  const id = useSelector((state) => state.user.id);
  const [todos, setTodos] = useState([]);

  const toggleComplete = (itemID, itemChecked) => {
    dispatch(toggleCompleted({ id: itemID, checked: itemChecked }));
  };

  const handleEdit = (todo) => {
    dispatch(setTodo(todo));
    navigate(`/edit`);
  };

  const handleDelete = (index) => {
    dispatch(deleteTodo(index));
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [id, addedTodos, dispatch]);

  useEffect(() => {
    setTodos(reduxTodos);
  }, [reduxTodos]);

  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      <div className="todos">
        {todos.map((item, index) => (
          <div className="todo" key={index}>
            <input
              type="checkbox"
              checked={item.checked || false}
              onChange={() => toggleComplete(item.id, item.checked)}
            />
            <p>{index + 1}</p>
            <div className="todo-container">
              <div className="todo-info">
                <div className="todo-info__text">
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div className="todo-buttons">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!todos.length && <p>There are no todos yet</p>}
    </>
  );
};

export default Todos;
