var loopback = require('loopback');
var boot = require('loopback-boot');
var redis = require('redis');

var app = module.exports = loopback();

app.use(loopback.context());
app.use(function myMiddleware (req, res, next) {
        var ctx = loopback.getCurrentContext();
        ctx.set('mytoken', 'hello world');
        console.log(ctx.get('mytoken')); // returns 'hello world'
        console.log('active test 1: ' + Object.keys(process.context.loopback.active)); // returns 'mytoken'
        
        var client = redis.createClient('6379', '127.0.0.1', {'max_attempts': 1});
        client.on('connect', function () {
            console.log('active test 2: ' + process.context.loopback.active); // returns 'null'
            return next();
        });
        console.log('active test 3: ' + Object.keys(process.context.loopback.active)); // returns 'mytoken'
    });

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
