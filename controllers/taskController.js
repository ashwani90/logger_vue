const Task = require('../models/tasks');
const utils = require('../utils/utils');
const PostQueries = require('../models/Queries/post');

/**
 * Function to add a task
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const addTask = async (req, res) => {
    try {
        let taskName = req.body.taskName;
        let expectedFinishDate = new Date(Date.parse(req.body.expectedFinishDate));
        let startDate = new Date(Date.parse(req.body.startDate));
        let description = req.body.description;
        let details = req.body.details;

        utils.log("[addTask] Request received to delete the information of a dish " + req.body);

        const task = await Task.create({
            taskName: taskName,
            expectedFinishDate: expectedFinishDate,
            startDate: startDate,
            description: description,
            details: details,
            user: req.user._id
        });

        return res.status(200).json({
           success: true,
           data: task
        });

    } catch (err) {
        utils.log("[addTask] Request received to delete the information of a dish " + err);
        if (err.code === 11000) {
            return res.status(400).json({error: 'This task already exists'});
        }

        return res.status(500).json({error: 'Something went wrong'});
    }
};

/**
 * Function to get all the tasks
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getTasks = async (req, res) => {
    try {
        utils.log("[getTasks] Request received to get all the tasks");

        // Query to get all the posts
        let limit = Number(req.query.limit) ? Number(req.query.limit) : 20;
        let pageNo = Number(req.query.pageNo) ? Number(req.query.pageNo) : 0;

        let conditionObject = {user: req.user._id};


        if (req.query.fromDate && req.query.toDate) {
            conditionObject.createdAt = {
                $gte: Date.parse(req.query.fromDate),
                $lt: Date.parse(req.query.toDate)
            }
        }

        if (req.query.status) {
            conditionObject.status = req.query.status;
        }

        const tasks = await Task.find(conditionObject)
            .skip(limit*pageNo)
            .limit(limit).sort( { createdAt: -1 } );

        return res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (err) {
        utils.log("[getTasks] Error occurred in the api " + err);
        return res.status(500).json({error: 'Something went wrong'});
    }
};

/**
 * Function to get a single task
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getTask = async (req, res) => {
    try {
        utils.log("[getTask] Request received to get all the tasks");
        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        const task = await Task.find({'_id' : objectId, user: req.user._id});

        return res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
            utils.log("[getTask] Error occurred in the api " + err);
        return res.status(500).json({error: 'Something went wrong'});
    }
};

const editTask = async (req, res) => {
    try {
        utils.log("[editTask] Request received to edit the task");

        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        let existingTask = await Task.findOne({_id: objectId});

        if (existingTask.status === 'completed') {
            return res.status(400).json({error: 'Task has already been marked as completed'});
        }

        if (!existingTask.user.equals(req.user._id)) {
            return res.status(400).json({error: 'You can not be here'});
        }

        let updateObject = {};

         if (req.body.hasOwnProperty('taskName')) {
            updateObject.taskName = req.body.taskName;
         }
        if (req.body.hasOwnProperty('expectedFinishDate')) {
            updateObject.expectedFinishDate = new Date(Date.parse(req.body.expectedFinishDate));
        }
        if (req.body.hasOwnProperty('startDate')) {
            updateObject.startDate = new Date(Date.parse(req.body.startDate));;
        }
        if (req.body.hasOwnProperty('description')) {
            updateObject.description = req.body.description;
        }
        if (req.body.hasOwnProperty('details')) {
            updateObject.details = req.body.details;
        }
        if (req.body.hasOwnProperty('status')) {
            let status = req.body.status;
             if (status === 'completed') {
                 updateObject.endDate = new Date();
                 updateObject.totalTimeSpent = await PostQueries.getTotalTimeSpent(objectId);
             }
            updateObject.status = status;
        }

        if (updateObject == {}) {
             return res.status(400).json({error: 'Nothing to update'});
        }

        await Task.findOneAndUpdate({'_id' : objectId}, updateObject);

        return res.status(200).json({
            success: true,
            message: "Doc updated"
        });
    } catch (err) {
        utils.log("[editTask] Error occurred in the api " + err);
        return res.status(500).json({error: 'Something went wrong'});
    }
};

module.exports = {
    addTask: addTask,
    getTasks: getTasks,
    getTask: getTask,
    editTask: editTask
};