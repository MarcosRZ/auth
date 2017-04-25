var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movementSchema = new Schema({
  date: Date,
  concept: String,
  quantity: String,
  notes: String
})

module.exports = mongoose.model('Movement', movementSchema);
