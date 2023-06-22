const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const PORT = 8080; // set port for
const path = require("path");

const db = require("./config/mongoose");

const app = express();

app.use(
  session({
    secret: "mysession",
    resave: false,
    saveUninitialized: false,
  })
);

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


app.listen(PORT, function (err) {
  if (err) {
    console.log("Error running the server", err);
    return;
  }

  console.log(`Server running on port: ${PORT}`);
});
