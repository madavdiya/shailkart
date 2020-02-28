const User = require('./user.model');
const utils = require('../../helpers/utils');
module.exports = {
    newUser: (req, res) => {
        let data = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        let newUser = new User(data);
        newUser.save((err, userInfo) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json({'status': 200, 'userInfo': userInfo});
            }
        });
    },
    getUserDetail: function(req, res) {
        let userId = req.params.userId;
        utils.getUserDetail(userId).then(userDetails => {
            console.log("user details ", userDetails); 
            if (userDetails.length) {
                delete userDetails[0].password;
                return res.status(201).json({
                success: true,
                message: 'successfully fetched',
                userDetails: userDetails[0]
            });
            } else {
                return res.status(401).json('Not Authorized')
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({err});
        })

    },

    updateUserById : async function (req, res) {
        let userId = req.decoded.id;
        if (req.body.isEmailChanged) {
            let isEmailExist = await utils.isEmailExist(req.body.email);
            if (isEmailExist) {
                res.status(500).json({error: {'code': 'ER_DUP_ENTRY'}});
            } else {
                utils.updateUserById(userId, req.body).then(details => {
                return res.status(201).json({
                    success: true,
                    message: 'successfully updated',
                    details
                })
                }).catch(err => {
                    res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? {'code': 'ER_DUP_ENTRY'} : err});
                })
            }
        } else {
            utils.updateUserById(userId, req.body).then(details => {
            return res.status(201).json({
                success: true,
                message: 'successfully updated',
                details
            })
            }).catch(err => {
                res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? 'Email Address Already Exist' : err});
            })
        }
    },

    updatePassword: function(req, res) {
        const userId = req.decoded.id;
        const confirmPassword = req.body.confirmPassword;
        utils.updatePassword(userId, confirmPassword).then(() => {
            return res.status(201).json({
                success: true,
                message: 'successfully changed password'
            })
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}