var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//GET /posts 所有用戶或者特定用戶的文章頁
//   eg:GET /posts?author=xxx
router.get('/',function (req,res,next) {
    res.send(req.flash());
})
//POST /posts 發表一篇文章
router.get('/posts',function (req,res,next) {
    res.send(req.flash());
})
//GET /posts/create 發表文章頁
router.get('/posts/create',function (req,res,next) {
    res.send(req.flash());
})
//GET /posts/:postId 單獨一篇的文章頁
router.get('/posts/:postId',function (req,res,next) {
    res.send(req.flash());
})
// GET /posts/:postId/edit 更新文章頁
router.get('/posts/:postId/edit',checkLogin,function (req,res,next) {
    res.send(req.flash());
});
// POST /posts/:postId/edit 更新一篇文章
router.post('/posts/:postId/edit',checkLogin,function (req,res,next) {
    res.send(req.flash());
})
//GET /posts/:postId/remove 刪除一篇文章
router.get('/posts/:postId/remove',checkLogin,function (req,res,next) {
    res.send(req.flash());
})
//POST /posts/:postId/comment 創建一條留言
router.get('/posts/:postId/comment',checkLogin,function (req,res,next) {
    res.send(req.flash());
})
//GET /posts/:postId/comment/:commentId/remove 刪除一條留言
router.get('/:postId/comment/:commentId/remove',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;