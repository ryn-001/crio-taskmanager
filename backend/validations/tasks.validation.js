const joi = require('joi');

const taskSchema = joi.object({
    email: joi.string().email().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid('TODO','DONE').default('TODO'),
    linkedfile: joi.binary().max(5*1024*1024).optional(),
    deadline: joi.date().greater('now').required(),
})

const getTaskSchema = joi.object({
    email: joi.string().email().required(),
})

const updateTaskSchema = joi.object({
    email: joi.string().email().required(),
    title: joi.string(),
    description: joi.string(),
    status: joi.string().valid('TODO','DONE').default('TODO'),
    linkedfile: joi.binary().max(5*1024*1024).optional(),
    deadline: joi.date().greater('now'),
})

const deleteTaskSchema = joi.object({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    email: joi.string().email().required(),
})

module.exports = {taskSchema,getTaskSchema,updateTaskSchema,deleteTaskSchema};