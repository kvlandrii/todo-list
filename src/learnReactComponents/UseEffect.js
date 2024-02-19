import React, { useEffect, useState } from "react";

const UseEffect = () => {
  const [someEffect, setEffect] = useState("Start");

  useEffect(() => {
    const changeEffect = () => {
      console.log("Clicked");
      setEffect("Clicked");
    };

    console.log("Render");

    window.addEventListener("click", changeEffect);

    return () => {
      window.removeEventListener("click", changeEffect);
    };
  }, [someEffect]);

  return <div>{someEffect}</div>;
};

export default UseEffect;
