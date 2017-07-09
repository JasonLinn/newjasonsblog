module.exports = {
    checkLogin:function checkLogin(req,res,next) {
        //當用戶訊息不存在時，則跳轉到登錄頁
        if(!req.session.user){
            req.flash('error','未登錄');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
        req.flash('succsess', '已登录'); 
        return res.redirect('back');//返回之前的页面
        }
        next();
    }
};