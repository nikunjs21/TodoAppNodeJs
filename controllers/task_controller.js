const Task = require('../models/task');

module.exports.list = function(req, res){
    Task.find({}).then(taskList => {
        return res.render('task', {
            title: "My TODO App",
            taskList
        });
    }).catch(err => {
        console.log("Error fetching Tasks ",err);
        return res.send("Error fetching Tasks " + JSON.stringify(err));
    });
};

module.exports.create = function(req, res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
    }).then(task => {
        console.task("Task Created Successfully!", task);
        return res.redirect("back");
    }).catch(err => {
        console.log("Error creating task", err);
        return res.redirect("back");
    });
}

module.exports.delete = function(req, res){
    const ids = req.body.ids;
    Task.deleteMany({_id: {$in:ids}}).then(() => res.status(200).json({
        message: "Deleted Successfully!"
    })).catch(err => res.status(500).json({
        message: "Something went wrong!",
        error: err
    }));
}