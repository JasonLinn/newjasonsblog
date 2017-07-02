var express = require('express');
var app = express();



app.use('/',function(req,res) {
    res.send(`<html><head>
        </head><body>Hello</body></html>`)
})
app.listen(3001)