var movementModel = require('../models/movementModel.js');

/**
 * movementController.js
 *
 * @description :: Server-side logic for managing movements.
 */
module.exports = {

    /**
     * movementController.list()
     */
    list: function (req, res) {
        movementModel.find(function (err, movements) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movement.',
                    error: err
                });
            }
            return res.json(movements);
        });
    },

    /**
     * movementController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        movementModel.findOne({_id: id}, function (err, movement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movement.',
                    error: err
                });
            }
            if (!movement) {
                return res.status(404).json({
                    message: 'No such movement'
                });
            }
            return res.json(movement);
        });
    },

    /**
     * movementController.create()
     */
    create: function (req, res) {
        var movement = new movementModel({			date : req.body.date,			concept : req.body.concept,			quantity : req.body.quantity,			notes : req.body.notes
        });

        movement.save(function (err, movement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating movement',
                    error: err
                });
            }
            return res.status(201).json(movement);
        });
    },

    /**
     * movementController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        movementModel.findOne({_id: id}, function (err, movement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movement',
                    error: err
                });
            }
            if (!movement) {
                return res.status(404).json({
                    message: 'No such movement'
                });
            }

            movement.date = req.body.date ? req.body.date : movement.date;			movement.concept = req.body.concept ? req.body.concept : movement.concept;			movement.quantity = req.body.quantity ? req.body.quantity : movement.quantity;			movement.notes = req.body.notes ? req.body.notes : movement.notes;			
            movement.save(function (err, movement) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating movement.',
                        error: err
                    });
                }

                return res.json(movement);
            });
        });
    },

    /**
     * movementController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        movementModel.findByIdAndRemove(id, function (err, movement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the movement.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
