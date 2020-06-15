const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saurabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page details',
        name: 'Akshay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'This is some helpful text',
       title: 'Help Page',
       name: 'Falak'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About the page !<h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode.geocode(req.query.address, (error, data) => {
        if(error)
        {
            return res.send({
                error //shorhand syntax
            })
        }
        forecast.forecast(data, (error, forecastData) => {
            if(error)
            {
                return res.send({
                    error: 'Unable to connect to the Weather API'
                })
            }
            else
            {
                res.send({
                    location: data.location,
                    forecast: forecastData
                })
            }
        })
        
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        errorText: 'Help Page Not Found !',
        name: 'Saurabh'
    })
})

// For 404 pages. Must be at the end.
app.get('*', (req, res) => {
    res.render('errorPage', {
        errorText: 'Page Not Found !',
        name: 'Saurabh'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port)
})