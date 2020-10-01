const Rental = require('../../models/rental');

exports.getAllRentals = (req, res) => {
    Rental.find({}, (err, rentals) => {
        if(err) {
            return Rental
                .sendError(res, { status: 422, detail: 'Unprocessable Entity!; Cannot retrieve rental.'});
        }
        return res.json(rentals)
    });
}

exports.getRentalById = (req, res) => {
    const { rentalId } = req.params;
    
    Rental.findById(rentalId, (err, rental) => {
        if (err) {            
            return Rental
                .sendError(res, { status: 422, detail: 'Unprocessable Entity!; Cannot retrieve rental by ID.'});
        }
        return res.json(rental);
    })
}

exports.createNewRental = (req, res) => {
    const rentalData = req.body;
    
    Rental.create(rentalData, (err, createdRental) => {
        if (err) {
            return Rental
                .sendError(res, { status: 422, detail: 'Unprocessable Entity!; Cannot post rentalData.'});
        }
        return res.json(createdRental);
    });    
}
