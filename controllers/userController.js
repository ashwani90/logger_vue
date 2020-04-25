const User = require('../models/user');
const utils = require('../utils/utils');
const passport = require('passport');

const signUp = async (req, res) => {
    try {
        let user = await User.findOne(
            {
                $or: [{ email: req.body.email }, { username: req.body.username }],
            }
        );

        if (!user) {
            let user = new User();
            user.setPassword(req.body.password);
            user.username = req.body.username;
            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.status = 'active';
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

// const login = async (req, res) => {
//     let user = {
//         email: req.body.email,
//         password: req.body.password
//     };
//
//     passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//         if(err) {
//             return next(err);
//         }
//
//         if(passportUser) {
//             const user = passportUser;
//
//             return res.status(200).json({
//                 success: true,
//                 data: user
//             });
//         }
//
//         return status(400).info;
//     })(req, res, next);
// };
//
// const editProfile = async (req, res) => {
//
// };
//
// const getUsers = async (req, res) => {
//
// };

module.exports = {
    signUp: signUp,
    // login: login
};