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

        // All these kind of things I will move to the validations
        let taskThere = await Task.findOne({taskId: taskId, user: req.user._id});

        if (taskThere.user !== req.user._id) {
            return res.status(409).send({success: false, message: "You are not allowed here"});
        }

        const post = await Post.create({
            postName: postName,
            timeSpent: timeSpent,
            details: details,
            task: taskId,
            status: 'active',
            user: req.user._id
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
        const posts = await Post.find({user: req.user._id}).populate('task', 'taskName');
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

        const post = await Post.find({'_id' : objectId, user: req.user._id}).populate('task', 'taskName');

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

        let existingPost = Post.findOne({user: req.user._id, _id: objectId});
        if (!existingPost) {
            return res.status(400).json({msg: "You can not access this post", status: "BAD_REQUEST"});
        }

        let updateObject = {};

        if (req.body.hasOwnProperty('isEnabled')) {
            updateObject.status = req.body.isEnabled ? 'active' : 'inactive';
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