const TaskServices = require("../services/tasks.services");

const getTasks = async (req, res) => {
    try {
        const email = req.user.email; 

        const tasks = await TaskServices.find(email);

        return res.status(200).json({
            success: true,
            tasks
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const updatedTask = await TaskServices.update(id, updateData);
        
        return res.status(200).json({
            success: true,
            task: updatedTask
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        await TaskServices.remove(id);
        
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const createTask = async (req, res) => {
    try {
        const taskData = { ...req.body, email: req.user.email };
        const newTask = await TaskServices.create(taskData);
        
        return res.status(201).json({
            success: true,
            task: newTask
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };