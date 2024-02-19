import React from "react";

const SelectorTodos = (p) => {
  const handleOptionChange = (event) => {
    p.setSelectedOption(event.target.value);
  };
  return (
    <select value={p.selectedOption} onChange={handleOptionChange}>
      {p.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectorTodos;
