/*globals module */
/*
    Module to define all the Configurations required
*/
let Config = function () {
    return {
        dbPath : "mongodb://localhost/sample-db",
    };
};

module.exports = new Config();