var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    morgan = require('morgan')
    cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(methodOverride())
app.use(cors());
app.use(morgan('tiny'))

require('./models/userModel');

var auth = require('./controllers/authController')
var middleware = require('./middlewares/middleware');

// Routes
app.use('/bower_components', express.static('client/bower_components'))
app.use('/', express.static('client/'));

var RootRouter = express.Router();
var APIRouter = express.Router();

// Rutas de autenticación y login
RootRouter.post('/auth/signup', auth.emailSignup);  
RootRouter.post('/auth/login', auth.emailLogin);


// Ruta solo accesible si estás autenticado
RootRouter.get('/private',middleware.ensureAuthenticated, function(req, res) {
  res.send("You are welcome, motherfucker! :)")
});

var userRoutes = require('./routes/userRoutes');
var movementRoutes = require('./routes/movementRoutes');

APIRouter.use('/movements', movementRoutes);  
APIRouter.use('/users', userRoutes);

app.use('/api', APIRouter);
app.use('/', RootRouter);



mongoose.connect('mongodb://localhost:27017/movements', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
