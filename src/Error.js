import React from "react";
import { Link } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  return (
    <div>
      <h1>Error!</h1>
      <h3>Something went wrong...</h3>
      <Link className="home-button" to="/todo-list">Go Home Page</Link>
    </div>
  );
};

export default Error;
