// auth.js
var mongoose = require('mongoose');  
var userModel = require('../models/userModel');  
var service = require('../services/tokenService');
var userController = require('../controllers/userController')
var md5 = require('md5')

exports.emailSignup = userController.create;

exports.emailLogin = function(req, res) {  

    if (!req.body.email || !req.body.passhash) return res.status(403).json({
                    message: 'Invalid username/password.'
                });

    userModel.findOne({email: req.body.email.toLowerCase()}, function(err, user) {

        if (err) return res.status(500).json({
                    message: 'Error when authenticating.',
                    err: err
                });

        if (!user || user.passhash != md5(req.body.passhash))
          return res.status(403).json({
                    message: 'Invalid username/password.'
                });
        
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};
