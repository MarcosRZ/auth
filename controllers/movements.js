//File: controllers/tvshows.js
var mongoose = require('mongoose');  
//var MovementModel  = mongoose.model('Movement');
var MovementModel  = require('../models/movement')


//GET - Return all Movements in the DB
exports.findAllMovements = function(req, res) {  
    MovementModel.find(function(err, movements) {
    if(err) res.send(500, err.message);

    console.log('GET /movements')
        res.status(200).jsonp(movements);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {  
    MovementModel.findById(req.params.id, function(err, tvshow) {
    if(err) return res.send(500, err.message);

    console.log('GET /movement/' + req.params.id);
        res.status(200).jsonp(movement);
    });
};

//POST - Insert a new movement in the DB
exports.addMovement = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var movement = new MovementModel({

        date: req.body.date,
        concept: req.body.concept,
        quantity: req.body.quantity,
        notes: req.body.notes
    });

    movement.save(function(err, movement) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(movement);
    });
};

//PUT - Update a register already exists
exports.updateMovement = function(req, res) {  
    MovementModel.findById(req.params.id, function(err, movement) {
        movement.date = req.body.date,
        movement.concept = req.body.concept,
        movement.quantity = req.body.quantity,
        movement.notes = req.body.notes

        movement.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(movement);
        });
    });
};

//DELETE - Delete a Movement with specified ID
exports.deleteMovement = function(req, res) {  
    MovementModel.findById(req.params.id, function(err, movement) {
        movement.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};

