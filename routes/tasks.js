var express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController');

/**
 * @swagger
 *
 * /tasks:
 *   get:
 *     description: Returns tasks
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: tasks
 *     tags:
 *      - "tasks"
 */
router.get('/', function(req, res, next) {
    taskController.getTasks(req, res);
});

/**
 * @swagger
 * /tasks/{_id}:
 *   get:
 *     description: Returns task with task id
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: _id
 *        description: Task id of the task
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "tasks"
 */
router.get('/:_id', function(req, res, next) {
    taskController.getTask(req, res);
});

/**
 * @swagger
 * /tasks/{_id}:
 *   put:
 *     description: Edit a single task with given id
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: _id
 *        description: Task id of the task
 *        in: path
 *        required: true
 *        type: string
 *     requestBody:
 *      description: Request body for the task
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      taskName:
 *                          type: string
 *                      expectedFinishDate:
 *                          type: string
 *                      startDate:
 *                          type: string
 *                      description:
 *                          type: string
 *                      details:
 *                          type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "tasks"
 */
router.put('/:_id', function(req, res, next) {
    taskController.editTask(req, res);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create a task
 *     produces:
 *      - application/json
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      taskName:
 *                          type: string
 *                      expectedFinishDate:
 *                          type: string
 *                      startDate:
 *                          type: string
 *                      description:
 *                          type: string
 *                      details:
 *                          type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "tasks"
 */
router.post('/', function(req, res, next) {
    taskController.addTask(req, res);
});

module.exports = router;