import React from "react";
import { Hourglass } from "react-loader-spinner";

const Loading = () => {
  return (
    <Hourglass
      visible={true}
      height="10vh"
      width="10vh"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={["#306cce", "#72a1ed"]}
    />
  );
};

export default Loading;
