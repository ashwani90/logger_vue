var express = require('express');
var router = express.Router();
const PostController = require('../controllers/postController');


/**
 * @swagger
 * /posts:
 *   get:
 *     description: Returns posts
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: posts
 */
router.get('/', function(req, res, next) {
    PostController.getPosts(req, res);
});

router.get('/:_id', function(req, res, next) {
    PostController.getPost(req, res);
});

router.put('/:_id', function(req, res, next) {
   PostController.editPost(req, res);
});

router.post('/', function(req, res, next) {
    PostController.addPost(req, res);
});



module.exports = router;