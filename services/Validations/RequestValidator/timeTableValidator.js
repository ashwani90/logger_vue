const timeValidator = require("../timeValidator");

const validateTimeSlots = (timeSlots) => {
    for(let i =0; i<timeSlots.length; i++) {
        if (!timeValidator.validateTimeDiff(timeSlots[i].fromTime, timeSlots[i].toTime)) {
            throw new Error("Invalid content in a time slot");
        }
        return true;
    }
};

module.exports = {
    validateTimeSlots: validateTimeSlots
};