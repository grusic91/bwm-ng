const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: {type: String, required: true, maxlength: [128, 'Invalid length! Maximum is 128 characters.']},
    city: {type: String, required: true, lowercase: true},
    street: {type: String, required: true, lowercase: true, maxlength: [128, 'Invalid length! Maximum is 128 characters.']},
    category: {type: String, required: true, lowercase: true},
    numOfRooms: {type: Number, required: true},
    image: {type: String, default:'http://via.placeholder.com/350x250'},
    description: {type: String, required: true},
    dailyPrice: {type: Number, required: true},
    shared: Boolean,
    createdAt: {type: Date, default: Date.now}
});

// define method for error handling
rentalSchema.statics.sendError = function(res, config) {
    const { status, detail } = config;
    return res.status(status).send({errors: [{title: 'Rental Error!', detail}]})
}

module.exports = mongoose.model('Rental', rentalSchema);