var express = require('express');
var app = express();

prot = process.env.PORT || 5000;

app.use('/',function(req,res) {
    res.send(`<html><head>
        </head><body>Hello</body></html>`)
})
app.listen(prot);