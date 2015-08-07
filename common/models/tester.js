var loopback = require('loopback');

module.exports = function(Tester) {

    Tester.observe('access', function limitToTenant(ctx, next) {
        next();
    });
};
