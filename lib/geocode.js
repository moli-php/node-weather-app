const request = require('request');

const geocode = (url, callback) => {
    request({url:url, json:true}, (err, res) => {
        if (err) {
            callback('error', 'Some error in geocode')
        } else if(res.body.features.length === 0) {
            callback('error', 'Search on found in geocode')
        } else {
            const result = {lat: res.body.features[0].center[0], long: res.body.features[0].center[1]}
            callback(null, result);
        }
    })
}


module.exports = geocode;