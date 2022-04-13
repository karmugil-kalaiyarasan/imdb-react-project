import React from "react";
import "./movies.css";
import { Link, useLocation } from "react-router-dom";

const Movies = (props) => {
  //   console.log(popularMovie.shows[0].title);
  // console.log(props.item.ids.imdb);
  // console.log(item.shows[index].title);
  return (
    <div className="mcontainer">
      <Link to={`/${props.item.ids.imdb}`} style={{ textDecoration: "none" }}>
        <div className="mtitle">
          Movie Name:
          <span>&nbsp;&nbsp;</span>
          {props.item.title}
        </div>
        <div className="myear">
          Year of Release:
          <span>&nbsp;&nbsp;</span>
          {props.item.year}
        </div>
      </Link>
    </div>
  );
};

export default Movies;
