var express = require('express');
var router = express.Router();
var Postcontroller = require('../controllers/controllers')

router.get('/', Postcontroller.getPosts)
router.get('/:id', Postcontroller.getPostById)
router.post('/', Postcontroller.createPost)
router.patch('/:id', Postcontroller.updatePost)
router.delete('/', Postcontroller.deleteAllPost)
router.delete('/:id', Postcontroller.deletePost)

module.exports = router;
