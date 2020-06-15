const request = require('request')

const forecast = ({longitude, latitude}, callback) => 
{
    const url = 'http://api.weatherstack.com/current?access_key=837c609da829974f6f43d19ec6ec768f&query=' +latitude+ ',' +longitude
    request({url, json: true}, (error, { body }) => 
    {
        if(error)
        {
            callback('Unable to access the weather API !', undefined)
        }
        else if(body.error)
        {
            callback(body.error.info, undefined)
        }
        else
        {
            callback(undefined, {
                summary: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                windSpeed: body.current.wind_speed,
                humidity: body.current.humidity,
                visibility: body.current.visibility
            })
        }
    })
}

module.exports = {
    forecast: forecast
}