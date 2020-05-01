var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

/**
 * @swagger
 *
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: tasks
 *     tags:
 *      - "users"
 */
router.get('/users', function(req, res, next) {
    UserController.getUsers(req, res);
});

/**
 * @swagger
 * /user/{_id}:
 *   get:
 *     description: Returns a user
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: _id
 *        description: User id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "users"
 */
router.get('/user/:_id', function(req, res, next) {
    UserController.getUser(req, res);
});

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login user api
 *     produces:
 *      - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "users"
 */
router.post('/login', function(req, res, next) {
    UserController.login(req, res, next);
});

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register a user api
 *     produces:
 *      - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                      username:
 *                          type: string
 *                      firstName:
 *                          type: string
 *                      lastName:
 *                          type: string
 *                      address:
 *                          type: array
 *                          items:
 *                              type: object
 *     responses:
 *       200:
 *         description: user as a result
 *     tags:
 *      - "users"
 */
router.post('/register', function(req, res, next) {
  UserController.signUp(req, res);
});

/**
 * @swagger
 * /user/{_id}:
 *   put:
 *     description: Edit profile of a user
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: _id
 *        description: User id
 *        in: path
 *        required: true
 *        type: string
 *     requestBody:
 *      description: Request body for the user edit
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                      username:
 *                          type: string
 *                      firstName:
 *                          type: string
 *                      lastName:
 *                          type: string
 *                      address:
 *                          type: string
 *     responses:
 *       200:
 *         description: task
 *     tags:
 *      - "users"
 */
router.put('/user/:_id', function(req, res, next) {
    res.send({message: "there is no content"});
});

module.exports = router;
