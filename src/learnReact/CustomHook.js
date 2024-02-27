import React from "react";
import useWindowWidth from "./useWindowWidth";

const CustomHook = () => {
  const { width } = useWindowWidth(0);

  return <div>{width}</div>;
};

export default CustomHook;
