var path = require('path');
var express = require('express');
//session 中間件會在req添加session對象，即req.session初始值為{},
//當我們登錄後設置req.session.user = 用戶訊息
//返回瀏覽器的頭信息中會帶上set-cookie 將session id 寫到瀏覽器cookie中，
//下次該用戶請求時，通過帶上來的cookie中的session id我們就可以查找到該用戶，
//並將用戶信息保存到req.session.user
var session = require('express-session'); 
//將session存儲於mongodb，須結合express-session使用，我們也可以將session
//存儲於redis，如connect-redis
var MongoStore = require('connect-mongo')(session);
//基於session實現的用於通知功能的中間件，須結合express-session使用
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');
var app = express();

prot = process.env.PORT || 5000;

// app.use('/',function(req,res) {
//     res.send(`<html><head>
//         </head><body>Hello</body></html>`)
// })
// app.listen(prot);


// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: 'mongodb://newjasonsblog:newjasonsblog@ds153352.mlab.com:53352/heroku_q1pm12v3'// mongodb 地址
  })
}));
// flash 中间件，用来显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));
// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));
// 路由
routes(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

//error page
app.use(function(err,req,res,next){
  res.render('error',{
    error:err
  })
})
// 监听端口，启动程序
if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  const port = process.env.PORT || config.port;
  app.listen(port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}