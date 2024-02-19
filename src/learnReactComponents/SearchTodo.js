import React, { useState } from "react";

const SearchTodo = (p) => {
  const [search, setSearch] = useState("");
  const [foundTodos, setFoundTodos] = useState([]);
  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchClick = () => {
    setFoundTodos(
      p.toDos.filter((todo) =>
        todo.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setSearch("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="search todo..."
          onChange={onChangeSearchHandler}
          value={search}
        />
        <button onClick={searchClick}>Search</button>
      </div>
      {foundTodos.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </>
  );
};

export default SearchTodo;
