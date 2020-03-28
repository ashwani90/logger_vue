var express = require('express');
var router = express.Router();
var taskController = require('../controllers/taskController');

/* GET home page. */
router.get('/', function(req, res, next) {
    taskController.getTasks(req, res);
});

router.get('/:_id', function(req, res, next) {
    taskController.getTask(req, res);
});

router.put('/:_id', function(req, res, next) {
    taskController.editTask(req, res);
});

router.post('/', function(req, res, next) {
    taskController.addTask(req, res);
});

module.exports = router;