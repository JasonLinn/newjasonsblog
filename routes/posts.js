var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var checkLogin = require('../middlewares/check').checkLogin;

//GET /posts 所有用戶或者特定用戶的文章頁
//   eg:GET /posts?author=xxx
router.get('/',function (req,res,next) {
    var author = req.query.author;
    PostModel.getPosts(author)
        .then(function (posts) {
            res.render('posts',{
                posts:posts
            })
        })
        .catch(next);
})
router.post('/',checkLogin,function(req,res,next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    //校驗參數
    try{
        if(!title.length){
            throw new Error('請填寫標題');
        }
        if(!content.length){
            throw new Error('請填寫內容');
        }
    }catch(e){
        req.flash('error',e.message);
        return res.redirect('back');
    }

    var post = {
        author:author,
        title:title,
        content:content,
        pv:0
    }
    PostModel.create(post)
        .then(function (result) {
            //此post 是插入mongodb後的值，包含_id
            post = result.ops[0];
            req.flash('success','發表成功');
            //發表成功後跳轉到該文章頁面
            res.redirect(`/posts/${post._id}`);
        })
        .catch(next);
    
})
//POST /posts 發表一篇文章
router.post('/posts',checkLogin,function (req,res,next) {

})

//GET /posts/create 發表文章頁
router.get('/create',function (req,res,next) {
    res.render('create');
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