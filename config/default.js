module.exports = {
    port:5000,
    session:{
        secret:'myblog',
        key:'myblog',
        maxAge:2592000000
    },
    mongodb:'mongodb://newjasonsblog:newjasonsblog@ds153352.mlab.com:53352/heroku_q1pm12v3'
};