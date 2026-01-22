const joi = require('joi');

const taskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid('TODO','DONE').default('TODO'),
    linkedfile: joi.binary().max(5*1024*1024).optional(),
    deadline: joi.date().greater('now').required(),
})

module.exports = {taskSchema};