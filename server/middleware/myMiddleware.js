var loopback = require('loopback');

module.exports = function () {
    return function myMiddleware (req, res, next) {
        try {
            console.log('In the middleware');
            
            var myObj = {
                'hello': 'world',
                'foo': 'bar'
            };

            var ctx = loopback.getCurrentContext();
            ctx.testset = 12;

            return next();
        } catch (err) {
            console.log('Error processing middleware. ' + err);
            return next();
        }
    };
};