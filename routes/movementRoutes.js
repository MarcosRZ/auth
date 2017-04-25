var express = require('express');
var router = express.Router();
var movementController = require('../controllers/movementController.js');

/*
 * GET
 */
router.get('/', movementController.list);

/*
 * GET
 */
router.get('/:id', movementController.show);

/*
 * POST
 */
router.post('/', movementController.create);

/*
 * PUT
 */
router.put('/:id', movementController.update);

/*
 * DELETE
 */
router.delete('/:id', movementController.remove);

module.exports = router;
