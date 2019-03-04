const express = require('express');
const router = express.Router();

// Point Model
const Point = require('../../models/Point');

// @route   GET api/points
// @desc    Get All Points
// @access  Public

router.get('/', (req, res) => {
    Point.aggregate([
        {
            $group: {
                _id: {
                    startTime: '$start_time',
                    lat: '$lat',
                    lng: '$lng',
                    speed: '$speed'
                }, 
                count: {$sum: 1}
            }
        },
        {
            $group: {
                _id: '$_id.startTime',
                segments:{
                    $push:{
                        lng: '$_id.lng',
                        lat: '$_id.lat',
                        timestamp: {$toDecimal: { '$add' : [ {$divide: [ {$toLong: '$_id.startTime'}, 1000000000]}, '$_id.speed' ] } }
                    }
                }
            }
        }
    ]).allowDiskUse(true)
    .exec(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            
            for(var i = 0; i< result.length; i++){
                result[i]['segments'].forEach((el, index) => {
                    //console.log(Object.keys(el).map(i => el[i]))
                    return result[i]['segments'][index] = Object.keys(el).map(j => parseFloat(el[j]));
                })
            }

            res.json(result);
        }
    });
});

module.exports = router;