const User = require("../api/user/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config()

function verifyAuth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
        expiresIn: '2d',
    };
    try {
        // verify makes sure that the token hasn't expired
        let result = jwt.verify(token, process.env.JWT_SECRET, options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}

function getUserByEmail(email) {
    return User.findOne({email}).exec();
}

module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        let result;
        if (authorizationHeader) {
            verifyAuth(req, res, next);
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    },
    bycryptPassword: (req, res, next) => {
        const user = req.body;
        if (user.hasOwnProperty('password')) {
            bcrypt.hash(user.password, +process.env.saltingRounds, function (err, hash) {
                if (err) {
                    console.log('Error hashing password for user', user.name);
                    next(err);
                } else {
                    user.password = hash;
                    next();
                }
            });
        } else {
            next(new Error('Please provide password'))
        }
    },
    verifyLogin: (req, res) => {
        let result = {};
        let status = 200;
        const {
            email,
            password
        } = req.body;
        getUserByEmail(email)
            .then(user => {
                console.log('.....', user)
                if (user && Object.keys(user).length) {
                    bcrypt.compare(password, user.password).then(match => {
                        if (match) {
                            status = 200;
                            // Create a token
                            const payload = {
                                email: user.email,
                                id: user._id,
                                name: user.name
                            };
                            const options = {
                                expiresIn: '2d'
                            };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);

                            // console.log('TOKEN', token);
                            result.token = token;
                            result.status = status;
                            // delete password as we don't need to send it to browser
                            delete user.password;
                            result.result = user;
                        } else {
                            status = 401;
                            result.status = status;
                            result.error = 'Authentication error';
                        }
                        res.status(status).send(result);
                    }).catch(err => {
                        status = 500;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    });
                } else {
                    status = 404;
                    result.status = status;
                    result.error = 'Authentication error';
                    res.status(status).send(result);
                }
            })
            .catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
    },

    getLoggedinUserDetails: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        if (authorizationHeaader) {
            verifyAuth(req, res, next);
        } else {
            let result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    },
    verifyPassword: (req, res, next) => {
        const email = req.decoded.email;
        const password = req.body.password;
        const error = {
            status: 401,
            message: 'UNAUTHORIZED'
        }
        getUserByEmail(email)
            .then(user => {
                if (user && Object.keys(user).length) {
                    bcrypt.compare(password, user.password).then(match => {
                        if (match) {
                            if (req.body.hasOwnProperty('confirmPassword')) {
                                bcrypt.hash(req.body.confirmPassword, +process.env.saltingRounds, function (err, hash) {
                                    if (err) {
                                        console.log('Error hashing password for user', user.name);
                                        next(err);
                                    } else {
                                        req.body.confirmPassword = hash;
                                        next();
                                    }
                                });
                            } else {
                                next(new Error('Please provide confirm password'))
                            }
                        } else {
                            next(new Error('please enter correct password'));
                        }
                    }).catch(err => {
                        next(err);
                    });
                } else {
                    next(error);
                }
            })
            .catch(err => {
                next(err);
            });
    },
    getUserDetail: (userId) => {
        return User.findById(userId).populate('payments').exec();
    },
    updateUserById: (userId, reqBody) => {
        return User.update({
            _id: userId
        }, reqBody).exec();
    },
    isEmailExist: (email) => {
        return new Promise((resolve, reject) => {
            getUserByEmail(email)
            .then(details => {
                resolve(details && Object.keys(details).length);
            })
            .catch(err =>{
                reject(err);
            })
        })
    },
    updatePassword: (userId, password) => {
        return User.update({_id: userId}, {password}).exec();
    }
};