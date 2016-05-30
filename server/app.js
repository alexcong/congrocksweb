/**
 * Created by alexcong on 5/30/2016.
 */
var koa = require('koa');
var path = require('path');
var serve = require('koa-static');

var app = koa();

app.use(serve(path.resolve(__dirname, '../client/public')));

var port = process.env.PORT || 3000;
app.listen(port);
