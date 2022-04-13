const express = require("express");
const path = require("path");
const fs = require("fs"); //file r/w module built-in to Node.js
//const https = require("https"); //built-in https module
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings
const cors = require("cors");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const app = express();
const port = process.env.PORT || "8080"; //variable for ports

const trakt = "https://api.trakt.tv";
// const imdb = `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/tt1375666`;

var state;
var check; //dummy varibale created to test a dummy api response
var stateagain;

app.use(cors()); //to avoid cors issue
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  //api path to list all the popular movies
  displayPopularShow(res); //function to get the json values asynchronously for the api path "/"
});

app.get("/cast", (req, res) => {
  //dummy api for locally test the hardcoded cast value
  displayCast(res);
});

app.get("/cast/:id", (req, res) => {
  //api path to list the full cast of the selected popular movie
  var imdbid = req.params.id; //variable that stores the id parameter from the path
  displayCastBasedOnId(res, imdbid); //function to get the json values asynchronously for the api path "/cast/:id"
});

//server listening
app.listen(port, () => {
  //server listening with port 8080
  console.log(`Listening on http://localhost:${port}`);
});

//function to display popular movies
function displayPopularShow(res) {
  var pageData = {
    title: "Show",
    shows: null,
  };
  axios({
    url: "/movies/popular?page=1&limit=15",
    baseURL: trakt,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  })
    .then(function (arg) {
      pageData.shows = arg.data;
      check = pageData.shows[1].ids.imdb;
      // console.log(arg.data);
      // console.log(check);
      state = check;
      stateagain = pageData;
      res.json(pageData);
      axios
        .get(
          `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${check}`
        )
        .then((response) => {
          //   console.log(response.data);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

//dummy api to test the hard coded cast internally
function displayCast(res) {
  var castData = {
    title: "Cast",
    casts: null,
  };
  axios
    .get(
      `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${state}`
    )
    .then((response) => {
      //   console.log(response.data);
      //   console.log(stateagain);
      res.json(response.data);
      // console.log(state);
    });
}

//function to display the cast based on movie id
function displayCastBasedOnId(res, id) {
  axios
    .get(
      `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${id}`
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
      //   console.log(state);
    });
}

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});
