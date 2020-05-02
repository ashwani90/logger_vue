const validator = require('validate.js');
const constraints = require('./constraints');


validator.validators.validateTime = (value, options, key, attributes) => {
    try {
        let date = new Date(Date.parse(value));
    } catch (e) {
        return "Invalid date is given";
    }
    return null;
};

validator.validators.validateAddress = (value, options, key, attributes) => {
    for (let i=0; i<value.length; i++) {
        validate(value[i], constraints.addressConstraints)
    }
};