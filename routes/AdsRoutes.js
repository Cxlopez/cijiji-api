const express = require('express');

const { AdsController } = require('../controllers');

const router = express.Router();

// CRUD REST API Ads ROUTES
// CREATE - post
router.post('/', AdsController.create);

// READ - get
// Read All
router.get('/', AdsController.getAll);

// Read One
router.get('/:id', AdsController.getById);

// UPDATE - put
router.put('/:id', AdsController.update);

// DELETE - delete
router.delete('/:id', AdsController.remove);

module.exports = router;