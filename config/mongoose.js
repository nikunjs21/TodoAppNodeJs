// import mongoose for database connection
const mongoose = require("mongoose");

// connect the database using mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/todo_app_db");

// get db connection
const db = mongoose.connection;

// in case any error see it in the logs
db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function(){
    console.log("Successfully connected to db");
});


