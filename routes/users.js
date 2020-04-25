var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

/* Get all users */
router.get('/users', function(req, res, next) {
    res.send({message: "there is no content"});
});

/* Get single user details */
router.get('/user/:_id', function(req, res, next) {
    res.send({message: "there is no content"});
});

/* Sign In */
router.get('/login', function(req, res, next) {
    UserController.login(req, res);
});

/* Sign Up */
router.post('/register', function(req, res, next) {
  UserController.signUp(req, res);
});

/* Sign In */
router.put('/user/:_id', function(req, res, next) {
    res.send({message: "there is no content"});
});

module.exports = router;
