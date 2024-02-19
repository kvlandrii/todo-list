import React from "react";

const TaskCounter = (props) => {
  return props.items.length > 0 && <p>{props.items.length}</p>;
};

export default TaskCounter;
