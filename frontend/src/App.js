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
  const [popularMovies, setPopularMovies] = useState([]); //state for getting the whole popular movie array
  // const [check, setCheck] = useState(null);
  // const [movieCast, setMovieCast] = useState(null);
  const [moviesList, setMoviesList] = useState([]); //state for getting the movie array from the popular movie array

  useEffect(() => {
    let done = false;
    const movieFunction = async () => {
      if (done) {
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/`);
        setPopularMovies([res.data]); //setting up the whole popular movie array
        setMoviesList(popularMovies[0].shows); //setting up the movie array from the popular movie array
        return () => {
          done = true; //we've finished loading
        };
      } catch (err) {}
    };
    movieFunction();
  }, [setPopularMovies, setMoviesList]);

  console.log(moviesList); //can use this console log to make changes and save to see the issue we talked on the meeting

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            {" "}
            {/* Route for the home route */}
            <div className="header">
              <Header />
            </div>
            <h1>Popular Movies</h1>
            <div className="movie">
              <div className="movie-cards">
                {moviesList.map(
                  (
                    item,
                    index //mapping the movies to the Movie component
                  ) => (
                    <Movies item={item} key={item.ids.trakt} />
                  )
                )}
              </div>
            </div>
            <div className="header">
              <Footer />
            </div>
          </Route>

          <Route exact path="/:id">
            {" "}
            {/* Route for the selected movie details route */}
            <div className="header">
              <Header />
            </div>
            <div className="cast">
              <Casts /> {/* Cast component rendered here */}
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
