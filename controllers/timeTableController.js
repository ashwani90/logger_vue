const TimeTable = require('../models/timeTable');
const utils = require('../utils/utils');
const timeSlotValidator = require('../services/Validations/RequestValidator/timeTableValidator');

/**
 * Function to add a task
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const addTimeTable = async (req, res) => {
    try {
        let timSlots = req.body.timeSlots;
        let isActive = true;
        let description = req.body.description;

        // later on move it to some middleware and kind of automate it
        timeSlotValidator.validateTimeSlots(timSlots);

        utils.log("[addTimeTable] Request received to add time table  " + req.body);

        const timeTable = await TimeTable.create({
            timeSlots: timSlots,
            isActive: isActive,
            description: description,
        });

        return res.status(200).json({
            success: true,
            data: timeTable
        });

    } catch (err) {
        utils.log("[addTimeTable] Error while processing the addTimeTable request " + err);
        if (err.code === 11000) {
            return res.status(400).json({error: 'This timeTable already exists'});
        }

        res.status(500).json({error: err.message, success: false});
    }
};

const disableEnableTimeTable = async(req, res) => {
    try {
        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        utils.log("[addTimeTable] Request received to update time table  " + req.body);

        let updateObject = {};

        if (req.body.hasOwnProperty('isActive')) {
            updateObject.isActive = req.body.isActive;
        }

        await TimeTable.findOneAndUpdate({'_id': objectId}, updateObject);

        return res.status(200).json({
            success: true,
            message: "Doc updated"
        });
    } catch (err) {
        utils.log("[addTimeTable] Error while processing the editTimeTable request " + err);
        if (err.code === 11000) {
            return res.status(400).json({error: 'This timeTable already exists'});
        }

        res.status(500).json({error: err.message, success: false});
    }
};

const getTimeTables = async (req, res) => {
    try {
        utils.log("[getTimeTables] Request received to get all the time tables");
        const timeTable = await TimeTable.find({});
        return res.status(200).json({
            success: true,
            data: timeTable
        });
    } catch (err) {
        utils.log("[getTimeTables] Error occurred in the api " + err);
        res.status(500).json({error: err.message, success: false});
    }
};

const getTimeTable = async (req, res) => {
    try {
        utils.log("[getTimeTable] Request received to get a time table");
        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        const timeTable = await TimeTable.find({'_id' : objectId});

        return res.status(200).json({
            success: true,
            data: timeTable
        });
    } catch (err) {
        utils.log("[getTimeTable] Error occurred in the api " + err);
        res.status(500).json({error: err.message, success: false});
    }
};

module.exports = {
    addTimeTable: addTimeTable,
    getTimeTable: getTimeTable,
    getTimeTables: getTimeTables,
    disableEnableTimeTable: disableEnableTimeTable
};