import React, { useRef, forwardRef } from "react";

const TextRef = forwardRef((props, ref) => {
  return (
    <>
      <textarea ref={ref} />
    </>
  );
});

const UseRef = () => {
  const refComponent = useRef();

  const focusArea = () => {
    refComponent.current.focus();
  };

  const blurArea = () => {
    refComponent.current.blur();
  };

  return (
    <>
      <TextRef ref={refComponent} />
      <button onClick={focusArea}>Focus</button>
      <button onClick={blurArea}>Blur</button>
    </>
  );
};

export default UseRef;
