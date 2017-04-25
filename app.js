var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

var userRoutes = require('./routes/userRoutes');

var MovementCtrl = require('./controllers/movements');

// API routes
var movements = express.Router();

movements.route('/movements')  
  .get(MovementCtrl.findAllMovements)
  .post(MovementCtrl.addMovement);

movements.route('/movements:id')  
  .get(MovementCtrl.findById)
  .put(MovementCtrl.updateMovement)
  .delete(MovementCtrl.deleteMovement);

router.use(movements);  
router.use('/user',userRoutes);

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/movements', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
