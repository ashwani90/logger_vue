/**
 * Function to validate the time in 24 hour format
 *
 * @param time
 * @returns {boolean}
 */
const validateTimeIn24HourFormat = (time) => {
    let rg = new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$");
    if (!rg.test(time.toString())) {
        throw new Error("Invalid Time Format");
    } else {
        return true;
    }
};

/**
 * Function to vaidate the time of 12 hour format
 *
 * @param time
 * @returns {boolean}
 */
const validateTimeIn12HourFormat = (time) => {
    let rg = new RegExp("^([0][0-9]|[1][0-2]):([0-5][0-9] [A,P][M])$");
    if (!rg.test(time.toString())) {
        throw new Error("Invalid Time Format");
    } else {
        return true;
    }
};

/**
 * Function to validate that there is some difference in the two time arguments
 *
 * @param fromTime
 * @param toTime
 * @param timeDifference
 * @returns boolean
 */
const validateTimeDiff = (fromTime, toTime, timeDifference = 0) => {
    fromTime = is24HourFormat(fromTime) ? fromTime : convertTo24HourFormat(fromTime);
    toTime = is24HourFormat(toTime) ? toTime : convertTo24HourFormat(toTime);

    return getTimeDiff(fromTime, toTime) > timeDifference;
};


/**
 * Function to check if time is in 24 hour format
 * Assumes that time is in some valid time format one or the other
 *
 * @param time
 * @returns {boolean}
 */
const is24HourFormat = (time) => {
    let rg = new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$");
    if (!rg.test(time.toString())) {
        return false;
    } else {
        return true;
    }
};

/**
 * Is not a public function as it assumes one of the valid time formats
 *
 * @param time
 * @return string
 */
const convertTo24HourFormat = (time) => {
    let rg = new RegExp("^([0][0-9]|[1][0-2]):([0-5][0-9] [P][M])$");
    let timeArray = time.toString().split(":");
    let minutes = timeArray[1].toString().split(" ")[0];

    if (rg.test(time)) {

            if (timeArray[0] == "12") {
                return timeArray[0] + ":" + minutes;
            }
            timeArray[0] = Number(timeArray[0]) + 12;

            return timeArray[0] + ":" + minutes;

    } else {
        if (timeArray[0] == "12") {
            timeArray[0] = "00";
            return timeArray[0] + ":" + minutes;
        } else {
            return timeArray[0] + ":" + minutes;
        }
    }
};

/**
 * Function to get time difference between two times in 24 hour format (in minutes)
 *
 * @param fromTime
 * @param toTime
 *
 * @return number
 *
 */
const getTimeDiff = (fromTime, toTime) => {
    let fromTimeArray = fromTime.toString().split(":");
    let fromTimeHour = Number(fromTimeArray[0]);
    let fromTimeMinutes = fromTimeArray[1].toString().split(" ")[0];
    let toTimeArray = toTime.toString().split(":");
    let toTimeHour = Number(toTimeArray[0]);
    let toTimeMinutes = toTimeArray[1].toString().split(" ")[0];

    let fromTotalMinutes = fromTimeHour*60 + Number(fromTimeMinutes);
    let toTotalMinutes = toTimeHour*60 + Number(toTimeMinutes);

    return toTotalMinutes - fromTotalMinutes;
};

module.exports = {
    validateTimeIn24HourFormat: validateTimeIn24HourFormat,
    validateTimeIn12HourFormat: validateTimeIn12HourFormat,
    validateTimeDiff: validateTimeDiff,
    is24HourFormat: is24HourFormat,
    convertTo24HourFormat: convertTo24HourFormat,
    getTimeDiff: getTimeDiff
};