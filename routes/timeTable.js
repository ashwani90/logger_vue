var express = require('express');
var router = express.Router();
var timeTableController = require('../controllers/timeTableController');

/**
 * @swagger
 *
 * /time-table:
 *   get:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *     description: Returns time tables
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: tasks
 *     tags:
 *      - "timeTable"
 */
router.get('/', function(req, res, next) {
    timeTableController.getTimeTables(req, res);
});

/**
 * @swagger
 * /time-table/{_id}:
 *   get:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *      - name: _id
 *        description: Time table id you want to get
 *        in: path
 *        required: true
 *        type: string
 *     description: Returns time table with time table id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "timeTable"
 */
router.get('/:_id', function(req, res, next) {
    timeTableController.getTimeTable(req, res);
});

/**
 * @swagger
 * /time-table/{_id}:
 *   put:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *      - name: _id
 *        description: Time table id of the time table
 *        in: path
 *        required: true
 *        type: string
 *     description: Edit a single time table with given id
 *     produces:
 *      - application/json
 *     requestBody:
 *      description: Request body for the time table
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      isActive:
 *                          type: boolean
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "timeTable"
 */
router.put('/:_id', function(req, res, next) {
    timeTableController.disableEnableTimeTable(req, res);
});

/**
 * @swagger
 * /time-table:
 *   post:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *     description: Create a time table
 *     produces:
 *      - application/json
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      timeSlots:
 *                          type: array
 *                      isActive:
 *                          type: boolean
 *                      description:
 *                          type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "timeTable"
 */
router.post('/', function(req, res, next) {
    timeTableController.addTimeTable(req, res);
});

module.exports = router;