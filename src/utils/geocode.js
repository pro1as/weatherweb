const request = require('request')

const geocode = (add, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(add)}.json?access_token=pk.eyJ1Ijoia2FuY2h3YWxhYiIsImEiOiJja3JwenpsanYwMnl6MnVwcTRhZHF4ZjRqIn0.AS9NKgPZS-afDbC9TP8w6g&limit=1`
    request({ url, json: true }, async (error, { body }) => {


        if (error) {
            callback('!')

        } else if (body.features.length === 0) {
            callback('not found')
        }
        else {
            callback(undefined, {

                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                loc: body.features[0].place_name

            })
        }


    })
}

module.exports =
    geocode
