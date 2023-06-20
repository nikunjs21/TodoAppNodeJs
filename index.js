const express = require("express");
const PORT = 8080;
const path = require("path");

const db = require("./config/mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use express router
app.use("/", require("./routes"));

// use url encoded for form data
app.use(express.urlencoded());

app.listen(PORT, function(err){
    if(err){
        console.log("Error running the server", err);
        return;
    }

    console.log(`Server running on port: ${PORT}`);
});