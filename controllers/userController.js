const User = require('../models/user');
const utils = require('../utils/utils');

const passport = require('passport');
const config = require('../config/passport');

const signUp = async (req, res) => {
    try {
        let user = await User.findOne(
            {
                $or: [{ email: req.body.email }, { username: req.body.username }],
            }
        );

        if (!user) {
            let user = new User();
            await user.setPassword(req.body.password);
            user.username = req.body.username;
            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.status = 'active';
            await user.createSession();
            let userData = await user.save();

            return res.status(200).json({
                success: true,
                data: userData
            });
        }
    } catch (err) {
        utils.log("[signUp] Error while processing the signUp request " + err);
        if (err.code === 11000) {
            return res.status(400).json({error: 'This user already exists'});
        }

        res.status(500).json({error: err.message, success: false});
    }

    };

const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user, info) {
        if (err) { return res.send({success: false}); }
        if (!user) { return res.send({success: false, message: "User was not found"}); }

        let sid = await user.createSession();

        await user.save();

        res.send({
            success: true,
            sid: sid,
            data: user
        });
    })(req, res, next);
};

const editProfile = async (req, res) => {

};

const getUsers = async (req, res) => {
    try {console.log(req.user);
        utils.log("[getUsers] Request received to get all the users");
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        utils.log("[getUsers] Error occurred in the api " + err);
        res.status(500).json({error: 'Something went wrong'});
    }
};

const getUser = async (req, res) => {
    try {
        utils.log("[getUser] Request received to get a user");
        const objectId = req.params._id;
        if (!objectId) {
            return res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
        }

        const user = await User.find({'_id' : objectId});

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        utils.log("[getUser] Error occurred in the api " + err);
        res.status(500).json({error: 'Something went wrong'});
    }
};

module.exports = {
    signUp: signUp,
    login: login,
    getUsers: getUsers,
    getUser: getUser
};