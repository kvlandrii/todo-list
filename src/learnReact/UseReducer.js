import React, { useState, useReducer } from "react";

const initialState = { name: "", lastName: "", birthYear: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "lastName":
      return { ...state, lastName: action.value };
    case "birthYear":
      return { ...state, birthYear: action.value };
    default:
      throw new Error("Invalid action");
  }
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastameInput] = useState("");
  const [birthInput, setBirthInput] = useState("");

  const nameChange = () => {
    dispatch({ type: "name", value: nameInput });
    setNameInput("");
  };

  const lastNameChange = () => {
    dispatch({ type: "lastName", value: lastNameInput });
    setLastameInput("");
  };

  const birthYearChange = () => {
    dispatch({ type: "birthYear", value: birthInput });
    setBirthInput("");
  };

  const onChangeName = (e) => {
    setNameInput(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastameInput(e.target.value);
  };

  const onChangeBirthYear = (e) => {
    setBirthInput(e.target.value);
  };

  return (
    <div>
      <p>{`name: ${state.name}`}</p>
      <p>{`lastname: ${state.lastName}`}</p>
      <p>{`name: ${state.birthYear}`}</p>
      <input type="text" onChange={onChangeName} value={nameInput} />
      <button onClick={nameChange}>Name</button>
      <br />
      <input type="text" onChange={onChangeLastName} value={lastNameInput} />
      <button onClick={lastNameChange}>Lastname</button>
      <br />
      <input type="text" onChange={onChangeBirthYear} value={birthInput} />
      <button onClick={birthYearChange}>birthYear</button>
    </div>
  );
};

export default UseReducer;
