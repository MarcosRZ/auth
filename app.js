var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {  
  res.send('Hello World!')
});

router.get('/movement/create', function(req, res) {  
 res.sendFile('./views/movement/Create.html');
});

router.get('*', function(req, res) {  
  console.log("pollas")
   res.send("No match!! :(");
});

var MovementCtrl = require('./controllers/movements');

// API routes
var movements = express.Router();

movements.route('/movements')  
  .get(MovementCtrl.findAllMovements)
  .post(MovementCtrl.addMovement);

movements.route('/movements/:id')  
  .get(MovementCtrl.findById)
  .put(MovementCtrl.updateMovement)
  .delete(MovementCtrl.deleteMovement);

app.use('/api', movements);  

app.use(router);

mongoose.connect('mongodb://localhost:27017/movements', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
