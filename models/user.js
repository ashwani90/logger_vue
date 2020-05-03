/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const generalHelper = require('../helpers/generalHelper');


const addressSchema = new Schema({ address1: String, city: String, state: String, country: String });
const sessionSchema = new Schema({ sid: String, enabled: Boolean });

// create a schema for Dish
let userSchema = new Schema({
    userName  : String,
    firstName  : String,
    lastName  : String,
    address: [addressSchema],
    email: String,
    password: String,
    salt: String,
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'user'
    },
    session: [ sessionSchema ]
}, {timestamps: true});

userSchema.methods.createSession = async function() {
    let salt = await bcrypt.genSalt(10);
    let newSid = await bcrypt.hash(generalHelper.generateRandomString(8), salt);
    this.session = [
        {
            sid: newSid,
            enabled: true
        }
    ];
    // console.log('this is coming hre');
    // console.log(newSid);
    // await this.session.push({
    //     sid: newSid,
    //     enabled: true
    // });
};

userSchema.methods.setPassword = async function(password) {

    let salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(password, salt);
    this.salt = salt;
    this.password = newPassword;
};

userSchema.methods.getUserFromSid = async function(sid) {
    return await User.findOne({'session.sid': sid, 'session.enabled': true});
};

// Create a model using schema
let User = mongoose.model("users", userSchema);

// make this model available
module.exports = User;