var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movementSchema = new Schema({

module.exports = mongoose.model('movement', movementSchema);