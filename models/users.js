var User = require('../lib/mongo').User;

module.exports = {
    //註冊一個用戶
    create:function create(user) {
        return User.create(user).exec();
    },
    //通過用戶名獲取用戶訊息
    getUserByName:function getuserByName(name) {
      return User
        .findOne({name:name})  
        //这里我们使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳)
        .addCreatedAt()
        .exec()
    }
};