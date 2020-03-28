const Post = require('../models/posts');
const Task = require('../models/tasks');
const utils = require('../utils/utils');

/**
 * Function to add a task
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const addPost = async (req, res) => {
    try {
        let postName = req.body.postName;
        let timeSpent = req.body.timeSpent;
        let taskId = req.body.taskId;
        let details = req.body.details;

        utils.log("[addPost] Request received to add the information of a post " + req.body);

        const post = await Post.create({
            postName: postName,
            timeSpent: timeSpent,
            details: details,
            task: taskId,
        });

        const taskExisting = await Task.findOne({'_id' : taskId});
        post.taskName = taskExisting.taskName;
        post.taskIdentifier = taskExisting._id;
        post.task = null;

        return res.status(200).json({
            success: true,
            data: post
        });

    } catch (err) {
        utils.log("[addPost] Request received to add a post " + err);
        if (err.code === 11000) {
            return res.status(400).json({error: 'This post already exists'});
        }

        res.status(500).json({error: 'Something went wrong'});
    }
};

/**
 * Function to get all the tasks
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getPosts = async (req, res) => {
    try {
        utils.log("[getPosts] Request received to get all the posts");
        const posts = await Post.find({}).populate('task', 'taskName');
        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (err) {
        utils.log("[getTasks] Error occurred in the api " + err);
        res.status(500).json({error: 'Something went wrong'});
    }
};

/**
 * Function to get a single task
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getPost = async (req, res) => {
    try {
        utils.log("[getPost] Request received to get one post");
        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        const post = await Post.find({'_id' : objectId}).populate('task', 'taskName');

        return res.status(200).json({
            success: true,
            data: post
        });
    } catch (err) {
        utils.log("[getPost] Error occurred in the api " + err);
        res.status(500).json({error: 'Something went wrong'});
    }
};

const editPost = async (req, res) => {
    try {
        utils.log("[editPost] Request received to edit the post");

        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        let updateObject = {};

        if (req.body.hasOwnProperty('postName')) {
            updateObject.postName = req.body.postName;
        }
        if (req.body.hasOwnProperty('taskId')) {
            updateObject.taskId = req.body.taskId;
        }
        if (req.body.hasOwnProperty('timeSpent')) {
            updateObject.timeSpent = req.body.timeSpent;
        }
        if (req.body.hasOwnProperty('details')) {
            updateObject.details = req.body.details;
        }

        if (updateObject == {}) {
            return res.status(400).json({error: 'Nothing to update'});
        }

        await Post.findOneAndUpdate({'_id' : objectId}, updateObject);

        return res.status(200).json({
            success: true,
            message: "Doc updated"
        });
    } catch (err) {
        utils.log("[editPost] Error occurred in the api " + err);
        return res.status(500).json({error: 'Something went wrong'});
    }
};

module.exports = {
    addPost: addPost,
    getPosts: getPosts,
    getPost: getPost,
    editPost: editPost
};