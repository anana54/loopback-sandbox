var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.use(loopback.context());
app.use(function myMiddleware (req, res, next) {
        try {
            var ctx = loopback.getCurrentContext();
            console.log('In the middleware. my token is: ' + ctx.mytoken);
            var authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
            	return next();
            }

            ctx.mytoken = authorizationHeader;

            return next();
        } catch (err) {
            console.log('Error processing middleware. ' + err);
            return next();
        }
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
