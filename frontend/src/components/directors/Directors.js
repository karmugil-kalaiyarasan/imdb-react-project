import React from "react";
import "./director.css";

const Directors = (props) => {
  console.log(props.item);
  return (
    <div className="card">
      <div className="title">
        <h3>Director Name:</h3>
        {props.item.name}
      </div>
    </div>
  );
};

export default Directors;
