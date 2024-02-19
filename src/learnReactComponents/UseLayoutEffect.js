import React, { useState, useLayoutEffect, useRef } from "react";

const UseLayoutEffect = () => {
  const [content, setContent] = useState([]);
  const containerRef = useRef();

  const addParagraph = () => {
    setContent((prevContent) => [
      ...prevContent,
      <p key={prevContent.length + 1}>New paragraph</p>,
    ]);
  };

  useLayoutEffect(() => {
    console.log("UseLayoutEffect");
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [content]);

  return (
    <div>
      <button onClick={addParagraph}>Додати абзац</button>
      <div
        ref={containerRef}
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default UseLayoutEffect;
