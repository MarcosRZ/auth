// services.js
var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('../config');

module.exports = {
  createToken: function(user) {  
    var payload = {
      sub: user._id,
      admin: user.admin,
      email: user.email,
      active: user.active,
      iat: moment().unix(),
      exp: moment().add(14, "days").unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
  }
}
