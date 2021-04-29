const request = require('request');

const weatherStack = (url, callback) => {
    // request ({url:url, json:true}, (err, res) => {
    request ({url:url, json:true}, (err, { body }) => { // destructuring
        if (err) {
            callback('Error', 'Some error')
        } else if (body?.success === false) {
            callback('Error', body.error.info)
        } else {
            callback(null, body)
        }
    })
}

module.exports = weatherStack