const generalConstants = require('../constants/generalConstants');
var createError = require('http-errors');
const User = require("../models/user");

module.exports = async function validateSession (req, res, next) {
    if (inArray(req.path, generalConstants.openRoutes)) {
        return next();
    }

    let sid = req.header('sid');

    if (!sid) {
        err = createError('Header missing from the request', 409);
        return res.send({success: false, error: 'Header missing from the request'});
    }

    let user = await (new User()).getUserFromSid(sid);

    if (!user) {
        return res.send({success: false, error: 'User does not exist'});
    }

    req.user = user;

    next();
};

function inArray(needle, haystack) {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(needle.indexOf(haystack[i]) !== -1) return true;
    }
    return false;
}
