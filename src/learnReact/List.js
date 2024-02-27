import SearchTodo from "./SearchTodo";
import SelectorTodos from "./SelectorTodos";
import TaskCounter from "./TaskCounter";
import Todos from "./Todos";
import { useState } from "react";

const List = () => {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");

  const [toDos, setTodos] = useState([
    { name: "first", isChecked: false },
    { name: "second", isChecked: true },
    { name: "third", isChecked: false },
    { name: "fourth", isChecked: false },
    { name: "fifth", isChecked: false },
  ]);

  const options = [
    { value: "option1", label: "Active" },
    { value: "option2", label: "Completed" },
    { value: "option3", label: "All" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[2].value);

  const onClickHandler = () => {
    if (input.length < 3) {
      setInputError("Min lenght of TODO must be greater than 3");
      return;
    }

    if (input.length > 15) {
      setInputError("Min lenght of TODO must be less than 15");
      return;
    }

    const updatedItem = [...toDos, { name: `${input}`, isChecked: false }];
    setTodos(updatedItem);
    setInput("");
    setInputError("");
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      const updatedItem = [...toDos, { name: `${input}`, isChecked: false }];
      setTodos(updatedItem);
      setInput("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ margin: 10 }}>{inputError && <div>{inputError}</div>}</div>
      <div>
        <input
          onChange={onChangeHandler}
          value={input}
          onKeyDown={onKeyPressHandler}
          placeholder="new task"
        />
        <button onClick={() => onClickHandler(input)}>Add TODO</button>
      </div>

      <SearchTodo toDos={toDos} />

      <SelectorTodos
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
      />
      <TaskCounter items={toDos} />

      <div>
        {toDos.map((item, index) => {
          return (
            <ul key={index}>
              {selectedOption === "option1" && !item.isChecked && (
                <Todos
                  item={item}
                  setTodos={setTodos}
                  index={index}
                  toDos={toDos}
                />
              )}
              {selectedOption === "option2" && item.isChecked && (
                <Todos
                  item={item}
                  setTodos={setTodos}
                  index={index}
                  toDos={toDos}
                />
              )}
              {selectedOption === "option3" && (
                <Todos
                  item={item}
                  setTodos={setTodos}
                  index={index}
                  toDos={toDos}
                />
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default List;
