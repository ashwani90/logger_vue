/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Task = require('./tasks');

// create a schema for Dish
let postSchema = new Schema({
    postName  : String,
    task   : { type: Schema.Types.ObjectId, ref: 'tasks' },
    createdAt : Date,
    timeSpent: Number,
    details: String,
    updatedAt: Date
});

// Create a model using schema
let Post = mongoose.model("posts", postSchema);

// make this model available
module.exports = Post;