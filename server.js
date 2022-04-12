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
const port = process.env.PORT || "8080";

const trakt = "https://api.trakt.tv";
const imdb = `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/tt1375666`;

var code, accessToken;
var state;
// var check = "tt1375666";
var check;
var stateagain;
var imdbid;

// .catch(console.error);

//LOCAL SSL CERTS
/* var opts = {
  ca: [fs.readFileSync("<path_to_rootkey>"), fs.readFileSync("<path_to_rootpem")],
  key: fs.readFileSync("<path_to_key>"),
  cert: fs.readFileSync("<path_to_crt>")
}; */
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  displayPopularShow(res);
});

app.get("/cast", (req, res) => {
  displayCast(res);
});

app.get("/cast/:id", (req, res) => {
  var imdbid = req.params.id;
  //   console.log(imdbid);
  displayCastBasedOnId(res, imdbid);
});

// app.get("/movie", (req, res) => {
//   let id = req.query.id;
//   let library = displayCast(res,id);
//   // let title = library.querySelector("name").textContent;

//   res.render("library", { title: title, library: library });
// });

// app.get("/page-requiring-oauth", (req, res) => {});
// app.get("/authorize", (req, res) => {});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  //   console.log(state);
});
/*
//HTTPS server
var server = https.createServer(opts, app);

server.listen(port, () => {
  console.log(`Listening on https://localhost:${port}`);
});
*/

//function to display popular shows
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
          // console.log(state);
          // console.log("success");
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

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
      // console.log("success");
    });
}

function displayCastBasedOnId(res, id) {
  axios
    .get(
      `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${id}`
    )
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
      //   console.log(state);
      //   console.log("success");
    });
}
// axios
//   .get(
//     `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${check}`
//   )
//   .then((response) => {
//     console.log(response.data);
//   });

// function displayCast(res, checkid) {
//   var castData = {
//     title: "Cast",
//     casts: null,
//   };
// axios({
//   url: "/shows/popular?page=1&limit=15",
//   baseURL: trakt,
//   method: "get",
//   headers: {
//     "Content-Type": "application/json",
//     "trakt-api-version": 2,
//     "trakt-api-key": process.env.TRAKT_CLIENT_ID,
//   },
// })
//   .then(function (arg) {
//     pageData.shows = arg.data;
//     console.log(arg.data);
//     res.render("popularShow", pageData);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

//   axios
//     .get(
//       `https://imdb-api.com/en/API/FullCast/${process.env.IMDB_CLIENT_ID}/${checkid}`
//     )
//     .then(function (arg) {
//       castData.casts = arg.data;
//       console.log(arg.data);
//       res.render("cast", castData);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});
