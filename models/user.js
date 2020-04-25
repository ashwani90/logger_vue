/*globals require, module */

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const crypto = require('crypto');

const addressSchema = new Schema({ address1: String, city: String, state: String, country: String });

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
    }
}, {timestamps: true});


userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// Create a model using schema
let User = mongoose.model("users", userSchema);

// make this model available
module.exports = User;