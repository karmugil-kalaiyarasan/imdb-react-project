import React from "react";
import "./writter.css";

const Writter = (props) => {
  console.log(props.item);
  return (
    <div className="card">
      <div className="title">
        <h3>Writer Name:</h3>
        {props.item.name}
      </div>
    </div>
  );
};

export default Writter;
