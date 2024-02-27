import React, { useState, useMemo } from "react";

const UseMemo = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const sum = useMemo(() => {
    console.log("Use memo");
    return numbers.reduce((prev, curr) => prev + curr, 0);
  }, [numbers.length]);

  const addNumbers = () => {
    console.log(numbers);
    setNumbers([...numbers, 1]);
  };

  const addNull = () => {
    console.log(numbers);
    setNumbers([...numbers]);
  };

  return (
    <>
      <p>{sum}</p>
      <button onClick={addNumbers}>Add</button>
      <button onClick={addNull}>Null</button>
    </>
  );
};

export default UseMemo;
