const express = require("express");
// use session to setup flash message
const session = require("express-session");
// use flash message library
const flash = require("connect-flash");

const PORT = 8080;
const path = require("path"); // use path to define some path directories for example: views directory
// use mongoose
const db = requre("./config/mongoose");
// initiate appp
const app = express();

//set session middleware
app.use(
  session({
    secret: "mysession",
    resave: false,
    saveUninitialized: false,
  })
);

//set flash middleware
app.use(flash());

// set view engine and path of the view files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files for styling and front-end javascripts
app.use(express.static("assets"));
// use url encoded for form data
app.use(express.urlencoded());

// use express router
app.use("/", require("./routes"));

// listen app (start the server) with port 8080
app.listen(PORT, function (err) {
  if (err) {
    console.log("Error running the server", err);
    return;
  }

  console.log(`Server running on port: ${PORT}`);
});
