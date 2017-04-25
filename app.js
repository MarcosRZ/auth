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
var movementRoutes = require('./routes/movementRoutes');


router.use('/movements', movementRoutes);  
router.use('/user', userRoutes);

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/movements', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
