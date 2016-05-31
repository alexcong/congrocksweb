/**
 * Created by alexcong on 5/30/2016.
 */
var app = require('koa')();
var middlewares = require('koa-middlewares');
var path = require('path');
var mongoose = require('mongoose');

app
    .use(middlewares.staticCache(path.resolve(__dirname, '../client/public')))
    .use(middlewares.staticCache(path.resolve(__dirname, '../bower_components')))
    .use(middlewares.bodyParser())
    .use(middlewares.favicon())
    .use(middlewares.logger())
;

/*database*/
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var CounterSchema = new Schema({
    counterId: Number,
    likesCounter: Number
});

var Counter = mongoose.model('Counter', CounterSchema);
var counter0 = new Counter({counterId: 0, likesCounter: 0});
app.use(function*(next) {
    counter0.save((err)=> {
        if (err) {
            console.log(err);
        }
    });
    yield next;
});

/* router */
var router = middlewares.router();
router
    .get('/likescounter', function*(next) {
        let counter = yield Counter.findOne({counterId: 0});
        this.response.body = counter.likesCounter;
    })
    .post('/likescounter', function*(next) {
        let counter = yield Counter.findOne({counterId: 0});
        counter.likesCounter = this.request.body.likesCounter;
        yield counter.save();
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