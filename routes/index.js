const express = require("express");

const router = express.Router();
const taskController = require("../controllers/task_controller");

router.get("/", taskController.list);

router.use("/tasks", require("./tasks"));

module.exports = router;