/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Post = require('./posts');

// create a schema for Dish
let taskSchema = new Schema({
    taskName  : String,
    posts   : [{ type: Schema.Types.ObjectId, ref: 'posts' }],
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    expectedFinishDate: Date,
    startDate: Date,
    endDate: Date,
    totalTimeSpent: Date,
    status:  {
        type: String,
        enum : ['active','inactive', 'completed', 'abandoned'],
        default: 'active'
    },
    details: String,
    description: String,
}, {timestamps: true});

// Create a model using schema
let Task = mongoose.model("tasks", taskSchema);

// make this model available
module.exports = Task;