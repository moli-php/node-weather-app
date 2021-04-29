const geocode = require('./geocode.js');
const weatherStack = require('./weather-stack.js');

const geoWeather = (query, callback) => {

    const endpoint_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const query_geo = encodeURIComponent(query) + '.json';
    const api_key_geo = 'pk.eyJ1Ijoicm9tdWxvLXNvcmlhbm8iLCJhIjoiY2tuenlnamxuMDJ3NzJ1bWx2eTgzdG05ZCJ9.ej9wbGZK3XAEbHnygjPCLg';
    const url_geo = endpoint_geo + query_geo + '?access_token=' + api_key_geo + '&limit=1';

    geocode(url_geo, (err, data) => {
        if (err) {
            callback('error', data)
        } else {
            const endpoint = 'http://api.weatherstack.com/current'
            const api_key = 'd9aac629b4cfa68254e0b681860a7848'
            const url = endpoint + '?access_key=' + api_key + '&query=' +  data.lat + ',' + data.long;

            weatherStack(url, (err, data) => {
                if (err) {
                    callback('err', data);
                } else {
                    callback(null, data);
                }
            })
        }
    })

}


module.exports = geoWeather;