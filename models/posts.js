/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// create a schema for Dish
let postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    postName  : String,
    task   : { type: Schema.Types.ObjectId, ref: 'Task' },
    createdAt : Date,
    timeSpent: Number,
    details: String,
    updatedAt: Date
});

// Create a model using schema
let Post = mongoose.model("posts", postSchema);

// make this model available
module.exports = Post;