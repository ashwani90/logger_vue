/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Task = require('./tasks');

// create a schema for Dish
let postSchema = new Schema({
    postName  : String,
    task   : { type: Schema.Types.ObjectId, ref: 'tasks' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt : Date,
    timeSpent: Number,
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'user'
    },
    details: String,
    updatedAt: Date
});

postSchema.methods.getPostsTime = async (taskId) => {

};

// Create a model using schema
let Post = mongoose.model("posts", postSchema);

// make this model available
module.exports = Post;