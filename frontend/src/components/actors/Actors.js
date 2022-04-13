import React from "react";
import "./actors.css";

const Actors = (props) => {
  console.log(props.item);
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.item.image} width="200px" height="200px" />
        </div>
        <div className="flip-card-back">
          <h3>Actor Name:</h3>
          {props.item.name}
          <h3>Character Name:</h3>
          {props.item.asCharacter}
        </div>
      </div>
    </div>
  );
};

export default Actors;
