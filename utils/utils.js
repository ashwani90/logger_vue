/*globals module */
/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

/*
	All the utility functios will be defined within this module
*/

let Utils = function () {
    let log;

    // Function to print logs on console
    log = function (message) {
        console.log(message);
    };

    return {
        log: log
    };
};

module.exports = new Utils();