const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    speed: {
        type: Number
    }
});

module.exports = Point = mongoose.model('point', PointSchema);