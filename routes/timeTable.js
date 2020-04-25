var express = require('express');
var router = express.Router();
var timeTableController = require('../controllers/timeTableController');

/* GET home page. */
router.get('/', function(req, res, next) {
    timeTableController.getTimeTables(req, res);
});

router.get('/:_id', function(req, res, next) {
    timeTableController.getTimeTable(req, res);
});

router.put('/:_id', function(req, res, next) {
    timeTableController.disableEnableTimeTable(req, res);
});

router.post('/', function(req, res, next) {
    timeTableController.addTimeTable(req, res);
});

module.exports = router;