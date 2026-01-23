const TaskServices = require("../services/tasks.services");

const getTasks = async (req,res) => {
    try{
        const {email} = req.body;
        const tasks = await TaskServices.find({email});
        return res.status(200).json({
            success: true,
            tasks
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateTask = async (req,res) => {
    try{
        const {id,title,description,status,linkedFile,createdOn,deadline} = req.body;
        const tasks = await TaskServices.update(id,{title,description,status,linkedFile,createdOn,deadline});
        return res.status(204).json({
            success: true,
            tasks
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteTask = async (req,res) => {
    try{
        const {id,title,description,status,linkedFile,createdOn,deadline} = req.body;
        const tasks = await TaskServices.remove(id);
        return res.status(204).json({
            success: true,
            tasks
        })
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

const createTask = async (req,res) => {
    try{
        const tasks = await TaskServices.create(req.body);
        return res.status(200).json({
            success: true,
            tasks
        })
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {createTask,getTasks,updateTask,deleteTask};