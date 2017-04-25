var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'email' : String,	'passhash' : String,	'active' : Boolean,	'admin' : Boolean});

module.exports = mongoose.model('user', userSchema);
