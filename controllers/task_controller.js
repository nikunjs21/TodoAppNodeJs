// use Task model to get listing, create and delete 
const Task = require("../models/task");

// function for format date as dd-mm-yyyy
function formatDate(date) {
  if (!date instanceof Date) {
    date = new Date(date);
  }
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

// listout the tasks, render task.ejs page 
module.exports.list = function (req, res) {
  Task.find({})
    .then((taskList) => {
      return res.render("task", {
        title: "My TODO App",
        taskList,
        success: req.flash("success"),
        error: req.flash("error"),
        formatDate: formatDate,
      });
    })
    .catch((err) => {
      console.log("Error fetching Tasks ", err);
      return res.send("Error fetching Tasks " + JSON.stringify(err));
    });
};

// create a task using post method
module.exports.create = function (req, res) {
  console.log(req.body);
  Task.create({
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
  })
    .then((task) => {
      console.log("Task Created Successfully!", task);
      req.flash("success", "Task Created Successfully!");
      return res.redirect("back");
    })
    .catch((err) => {
      req.flash("error", "Error creating task: " + err.message);
      console.log("Error creating task", err);
      return res.redirect("back");
    });
};

// delete tasks by ids using delete method
module.exports.delete = function (req, res) {
  const ids = req.body.ids;
  Task.deleteMany({ _id: { $in: ids } })
    .then(() =>
      res.status(200).json({
        status: true,
        message: "Deleted Successfully!",
      })
    )
    .catch((err) =>
      res.status(500).json({
        status: false,
        message: "Something went wrong!",
        error: err,
      })
    );
};
