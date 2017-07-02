var express = require('express');
var router = express.Router();


var checkNotLogin = require('../middlewares/check').checkLogin;

// GET /signin登錄頁
router.get('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});
// POST /signin用戶登錄
router.get('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});
module.exports = router;
