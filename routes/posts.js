var express = require('express');
var router = express.Router();
const PostController = require('../controllers/postController');


/**
 * @swagger
 * /posts:
 *   get:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *     description: Returns posts
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: posts
 *     tags:
 *      - "posts"
 */
router.get('/', function(req, res, next) {
    PostController.getPosts(req, res);
});

/**
 * @swagger
 * /posts/{_id}:
 *   get:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *      - name: _id
 *        description: Post id of the post
 *        in: path
 *        required: true
 *        type: string
 *     description: Returns post with post id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: posts
 *     tags:
 *      - "posts"
 */
router.get('/:_id', function(req, res, next) {
    PostController.getPost(req, res);
});

/**
 * @swagger
 * /posts/{_id}:
 *   put:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *      - name: _id
 *        description: Post id of the post
 *        in: path
 *        required: true
 *        type: string
 *     description: Edit a single post with given id
 *     produces:
 *      - application/json
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      postName:
 *                          type: string
 *                      taskId:
 *                          type: string
 *                      details:
 *                          type: string
 *                      timeSpent:
 *                          type: string
 *     responses:
 *       200:
 *         description: posts
 *     tags:
 *      - "posts"
 */
router.put('/:_id', function(req, res, next) {
   PostController.editPost(req, res);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     parameters:
 *      - name: sid
 *        type: string
 *        in: header
 *        description: Session id in header
 *     description: Create post
 *     produces:
 *      - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      postName:
 *                          type: string
 *                      taskId:
 *                          type: string
 *                      details:
 *                          type: string
 *                      timeSpent:
 *                          type: string
 *     responses:
 *       200:
 *         description: posts
 *     tags:
 *      - "posts"
 */
router.post('/', function(req, res, next) {
    PostController.addPost(req, res);
});

module.exports = router;