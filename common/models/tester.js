var loopback = require('loopback');

module.exports = function(Tester) {

    Tester.observe('access', function limitToTenant(ctx, next) {
        var context = loopback.getCurrentContext(); // returns null
        console.log(process.context.loopback); // returns an object
        console.log(process.context.loopback.active); // returns null. 
        next();
    });
};
