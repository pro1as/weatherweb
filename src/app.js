const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abs'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abs'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abs'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'need search term' })
    }

    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'need location' })
    }

    geocode(req.query.address, (error, { lat, lon, loc } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    })



})

app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: 'help not found',
        name: 'Abs'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        msg: 'not found 404',
        name: 'Abs'
    })
})



app.listen(port, () => {
    console.log('Server is up on port 3000.')
})