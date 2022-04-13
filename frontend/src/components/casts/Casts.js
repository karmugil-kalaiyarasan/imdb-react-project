import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Directors from "../directors/Directors";
import Writter from "../writter/Writter";
import Actors from "../actors/Actors";
import "./casts.css";

const Casts = () => {
  const { id } = useParams();

  console.log(id);

  // let dummy = id;

  const [movieCast, setMovieCast] = useState([]);
  // const [check, setCheck] = useState(null);
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);
  const [actor, setActor] = useState([]);

  useEffect(() => {
    const castFunction = async () => {
      // axios.get(`http://localhost:8080/`).then((response) => {
      //   //   console.log(response.data);
      //   setPopularMovies(response.data);
      //   console.log(popularMovies);
      //   // console.log(state);
      //   // console.log("success");
      // });

      try {
        const res = await axios.get(`http://localhost:8080/cast/${id}`);
        setMovieCast([res.data]);
        setDirector(movieCast[0].directors.items);
        setWriter(movieCast[0].writers.items);
        setActor(movieCast[0].actors);
      } catch (err) {}
    };
    castFunction();
    // setCheck(id);
  }, []);

  console.log(movieCast);
  // console.log(director);

  return (
    <div className="container">
      <h2>Director</h2>
      <div className="director">
        <div className="director-cards"></div>
        {director.map((item, index) => (
          <Directors item={item} key={item.id} />
        ))}
      </div>
      <h2>Writer</h2>
      <div className="writer">
        <div className="writer-cards">
          {writer.map((item, index) => (
            <Writter item={item} key={item.id} />
          ))}
        </div>
      </div>
      <h2>Cast</h2>
      <div className="actors">
        <div className="actor-cards">
          {actor.map((item, index) => (
            <Actors item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Casts;
