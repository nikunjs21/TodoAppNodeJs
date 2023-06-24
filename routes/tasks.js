// import express and use express.Router()
const express = require("express");
const router = express.Router();

// taskController to call actions per defined routes
const taskController = require("../controllers/task_controller");

// to create the task
router.post("/create", taskController.create);

// to delete multiple tasks
router.delete("/delete", taskController.delete);

// export router
module.exports = router;