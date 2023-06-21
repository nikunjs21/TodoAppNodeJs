// import express
const express = require("express");

// use express.Router to handle routes
const router = express.Router();
// get taskController to use function per routes defined
const taskController = require("../controllers/task_controller");

// to listout tasks of todo
router.get("/", taskController.list);

// use tasks.js file to perform further actions. 
// (we can also define other routes here, this is just for practice)
router.use("/tasks", require("./tasks"));

// export the router
module.exports = router;