const Rental = require('../../models/rental');

exports.getAllRentals = (req, res) => {
    Rental.find({}, (err, rentals) => {
        if(err) { return res.mongoError(err); }
        return res.json(rentals);
    });
}

exports.getRentalById = (req, res) => {
    const { rentalId } = req.params;
    
    Rental.findById(rentalId, (err, rental) => {
        if (err) { return res.mongoError(err); }
        return res.json(rental);
    })
}

exports.createNewRental = (req, res) => {
    const rentalData = req.body;
    
    Rental.create(rentalData, (err, createdRental) => {
        if (err) { return res.mongoError(err); }
        return res.json(createdRental);
    });    
}
