const Task = require("../models/tasks.model");

const find = async (email) => {
    const tasks = await Task.find({email});
    return tasks;
}

const create = async (body) => {
    const newTask = new Task(body);
    await newTask.save();
    return newTask;
}

const update = async (id,body) => {
    const updatedTask = await Task.findByIdAndUpdate(id,body,{new: true});
    return updatedTask;
}

const remove = async (id) => {
    const tasks = await Task.findByIdAndDelete(id);
    return tasks;
}

module.exports = {find,create,update,remove}