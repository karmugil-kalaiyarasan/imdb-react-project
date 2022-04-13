import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Movies from "./components/movies/Movies";
import keyIndex from "react-key-index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Casts from "./components/casts/Casts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [check, setCheck] = useState(null);
  const [movieCast, setMovieCast] = useState(null);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    let done = false;
    const movieFunction = async () => {
      // axios.get(`http://localhost:8080/`).then((response) => {
      //   //   console.log(response.data);
      //   setPopularMovies(response.data);
      //   console.log(popularMovies);
      //   // console.log(state);
      //   // console.log("success");
      // });

      if (done) {
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/`);
        setPopularMovies([res.data]);
        setMoviesList(popularMovies[0].shows);
        return () => {
          done = true; //we've finished loading
        };
        // popularMovies = keyIndex(popularMovies, 1);
        // setCheck(res.data.shows[1].ids.imdb);
        // setCheck("tt0848228");
      } catch (err) {}
    };
    movieFunction();

    // const interval = setInterval(() => {
    //   movieFunction();
    // }, 10000);

    // return;
  }, [setPopularMovies, setMoviesList]);

  // useEffect(() => {
  //   const castFunction = async () => {
  //     // axios.get(`http://localhost:8080/`).then((response) => {
  //     //   //   console.log(response.data);
  //     //   setPopularMovies(response.data);
  //     //   console.log(popularMovies);
  //     //   // console.log(state);
  //     //   // console.log("success");
  //     // });

  //     try {
  //       const res = await axios.get(`http://localhost:8080/cast/${check}`);
  //       setMovieCast(res.data);
  //     } catch (err) {}
  //   };
  //   castFunction();
  // }, [check]);

  console.log(check);
  // console.log(popularMovies.title);
  // console.log(movieCast);
  // console.log(moviesList);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            {/*{popularMovies.map(
        (item, index) => (
          // <Movies item={item} index={index} key={index} />
          <Movies {...item} index={index} key={item.shows.title} />
        )
        // console.log(index + " = " + item + " = " + item[index])
        // console.log(item);
        )}*/}
            {/*{moviesList.map((item, index) => (
        <Movies item={item} key={index} />
      ))}*/}
            <div className="header">
              <Header />
            </div>
            <h1>Popular Movies</h1>
            <div className="movie">
              <div className="movie-cards">
                {moviesList.map((item, index) => (
                  <Movies item={item} key={item.ids.trakt} />
                ))}
              </div>
            </div>
            <div className="header">
              <Footer />
            </div>
          </Route>
          <Route exact path="/:id">
            <div className="header">
              <Header />
            </div>
            <div className="cast">
              <Casts />
            </div>
            <div className="header">
              <Footer />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
