var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movementSchema = new Schema({	'date' : Date,	'concept' : String,	'quantity' : Number,	'notes' : String});

module.exports = mongoose.model('movement', movementSchema);
