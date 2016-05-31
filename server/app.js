/**
 * Created by alexcong on 5/30/2016.
 */
var app = require('koa')();
var middlewares = require('koa-middlewares');
var path = require('path');

app
    .use(middlewares.staticCache(path.resolve(__dirname, '../client/public')))
    .use(middlewares.staticCache(path.resolve(__dirname, '../bower_components')))
    .use(middlewares.bodyParser())
    .use(middlewares.favicon())
    .use(middlewares.logger())
;

//temp var
var counter = 0;

/* router */
var router = middlewares.router();
router
    .get('/likescounter', function*(next) {
        this.body = counter;
        console.log('counter', counter);
    })
    .post('/likescounter', function*(next) {
        counter = this.request.body.likesCounter;
        console.log('counter', counter);
        this.status = 200;
    })
;

app
    .use(router.routes())
    .use(router.allowedMethods())
;

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port 3000');