/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// create a schema for Dish
let taskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    taskName  : String,
    posts   : [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    createdAt : Date,
    expectedFinishDate: Date,
    startDate: Date,
    endDate: Date,
    totalTimeSpent: Date,
    status: {type: Schema.Types.ObjectId, ref: 'Status'},
    details: String,
    description: String,
    updatedAt: Date
});

// Create a model using schema
let Task = mongoose.model("tasks", taskSchema);

// make this model available
module.exports = Task;