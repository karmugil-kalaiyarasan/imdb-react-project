import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Directors from "../directors/Directors";
import Writter from "../writter/Writter";
import Actors from "../actors/Actors";
import "./casts.css";

const Casts = () => {
  const { id } = useParams(); //useParam to get the parameter which the :id on the url

  console.log(id);

  const [movieCast, setMovieCast] = useState([]); //state for getting the whole cast array
  const [director, setDirector] = useState([]); //state for getting the director array from the cast array
  const [writer, setWriter] = useState([]); //state for getting the writer array from the cast array
  const [actor, setActor] = useState([]); //state for getting the actor array from the cast array

  useEffect(() => {
    const castFunction = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/cast/${id}`); //getting from the backend api
        setMovieCast([res.data]); //setting up the whole cast array
        setDirector(movieCast[0].directors.items); //setting up the director array
        setWriter(movieCast[0].writers.items); //setting up the writer array
        setActor(movieCast[0].actors); //setting up the actor array
      } catch (err) {}
    };
    castFunction();
  }, []);

  console.log(movieCast); //can use this console log or the one below to make changes and save to see the issue we talked on the meeting
  console.log(director);

  return (
    <div className="container">
      <h2>Director</h2>
      <div className="director">
        <div className="director-cards"></div>
        {director.map(
          (
            item,
            index //mapping the director to the Director component
          ) => (
            <Directors item={item} key={item.id} />
          )
        )}
      </div>
      <h2>Writer</h2>
      <div className="writer">
        <div className="writer-cards">
          {writer.map((item, index) => (
            <Writter item={item} key={item.id} /> //mapping the writer to the Writer component
          ))}
        </div>
      </div>
      <h2>Cast</h2>
      <div className="actors">
        <div className="actor-cards">
          {actor.map((item, index) => (
            <Actors item={item} key={item.id} /> //mapping the Actor to the Actor component
          ))}
        </div>
      </div>
    </div>
  );
};

export default Casts;
