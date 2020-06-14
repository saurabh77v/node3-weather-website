const request = require('request')

const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1Ijoic2F1cmFiaDc3diIsImEiOiJja2IweXNuejQwY3ljMnJzOWN4emNzNTRuIn0.DzXj-128vGovBvBGTKJqNQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to the location service !', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find location with the search criteria !', undefined)
        }
        else
        {
            //console.log(response.body.features[0].center[1])
            //console.log(response.body.features[0].center[0])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode: geocode
}