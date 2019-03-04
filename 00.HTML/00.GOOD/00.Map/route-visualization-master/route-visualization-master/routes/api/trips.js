const express = require('express');
const router = express.Router();

// Trip Model
const Trip = require('../../models/Trip');

// @route   GET api/trips
// @desc    Get All Trips
// @access  Public

router.get('/', (req, res) => {
    Trip.find()
        .then(trips => res.json(trips))
});

module.exports = router;