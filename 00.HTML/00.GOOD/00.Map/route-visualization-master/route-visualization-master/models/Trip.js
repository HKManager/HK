const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    }
});

module.exports = Trip = mongoose.model('trip', TripSchema);