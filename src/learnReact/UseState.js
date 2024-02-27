import React, { useState, useRef } from "react";

const UseState = () => {
  const container = useRef(null);
  const names = ["First", "Second", "Third", "Fourth", "Fifth"];
  const [content, setContent] = useState("");

  const randomNumberInRange = (min, max) => {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(id + 1);
    return id;
  };

  const printHello = () => {
    setContent(`Hello ${names[randomNumberInRange(0, 4)]}`);
  };

  return (
    <>
      <div ref={container}>{content}</div>
      <button onClick={printHello}>Print Hello</button>
    </>
  );
};

export default UseState;
