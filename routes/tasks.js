var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json('All tasks');
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    res.json(id);
});

router.put('/:id', function(req, res, next) {
    let id = req.params.id;
    res.json(id);
});

router.post('/', function(req, res, next) {
    res.json("the add time for task");
});

module.exports = router;