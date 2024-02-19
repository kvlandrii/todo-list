import React from "react";

const CompletedTodos = (p) => {
  const handleChange = (index) => {
    p.setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
      return updatedTodos;
    });
  };

  const removeTodo = (index) => {
    p.setTodos(
      p.toDos.filter((_, i) => {
        return i !== index;
      })
    );
  };

  const deleteTodo = (index) => {
    p.setTodos(
      p.toDos.filter((_, i) => {
        return i !== index;
      })
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="checkbox"
        checked={p.item.isChecked}
        onChange={() => handleChange(p.index)}
      />
      <div
        onClick={() => removeTodo(p.index)}
        style={{
          textDecoration: p.item.isChecked ? "line-through" : "none",
        }}
      >
        {p.item.name}
      </div>
      <button onClick={() => deleteTodo(p.index)}>Delete</button>
    </div>
  );
};

export default CompletedTodos;
