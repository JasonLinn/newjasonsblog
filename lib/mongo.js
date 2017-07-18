var Mongolass = require('mongolass');
var mongolass = new Mongolass();
//產生時間戳
var objectIdToTimestamp = require('objectid-to-timestamp');
var moment = require('moment');
//根據id生成創建時間created_at
mongolass.plugin('addCreatedAt',{
  afterFind:function (results) {
    results.forEach(function (item) {
      item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne:function (result) {
    if(result){
      result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
})

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post',{
  author:{type:Mongolass.Types.ObjectId},
  content:{type:'string'},
  postId:{type:Mongolass.Type}
});
exports.Post.index({author:1,_id:-1}).exec();//按創建時間將續查看用戶的文章列表

exports.Comment = mongolass.model('Comment',{
  author:{type:Mongolass.Types.ObjectID},
  content:{type:'string'},
  postId:{type:Mongolass.Types.ObjectId}
});
exports.Comment.index({postId:1,_id:1}).exec();//通過文章id獲取該文章下所有留言，按留言創建時間升序
exports.Comment.index({author:1,_id:1}).exec();//通過用戶id和留言id刪除一個留言

