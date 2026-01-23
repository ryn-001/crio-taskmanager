const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email:{
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['TODO','DONE'],
        default: 'TODO'
    },
    linkedFile:{
        type: Buffer
    },
    createdOn:{
        type: Date,
        default: Date.now,
        required: true   
    },
    deadline:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Task',taskSchema);