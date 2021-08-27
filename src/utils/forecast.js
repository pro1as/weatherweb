const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=072215242461a0021ec8b7800c23da9e&query=${lat},${lon}`
    request({ url, json: true }, async (error, { body }) => {


        if (error) {
            callback('!')
        }
        else if (body.error) {
            callback('not found')
        }
        else {
            callback(undefined,
                `${body.current.weather_descriptions[0]}! currently the temperature is ${body.current.temperature} & it feels like ${body.current.feelslike}`)
        }
    })
}



module.exports = forecast