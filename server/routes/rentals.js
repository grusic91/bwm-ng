const express = require('express');
const router = express.Router();
const {
    getAllRentals,
    getRentalById,
    createNewRental
 } = require('../controllers/rental-route');

router.get('', getAllRentals);
router.get('/:rentalId', getRentalById);
router.post('', createNewRental);

module.exports = router;
