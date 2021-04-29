const path = require('path')
const dotenv = require('dotenv')
const hbs = require('hbs')
const express = require('express')
dotenv.config()
const geoWeather = require('../lib/geo-weather');


const publicPath = path.join(__dirname, '../public')
// const viewTemplates = path.join(__dirname, '../templates') // target view templates path
// const viewTemplates = path.join(__dirname, '../views') // target view templates path
const app = express()

app.set('view engine', 'hbs') // defualt to "/views" folder
// app.set('views', viewTemplates) // target view templates path

const partialsPath = path.join(__dirname, '../views/partials')
// console.log(partialsPath)
hbs.registerPartials(partialsPath);

// setup static
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {title: 'Weather'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help'})
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: 'Help article not found', message: 'Article seached not found'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        res.send('no address param')
    } 

    geoWeather(address, (err, data) => {
        if (err) {
            res.send({err:err, data: data})
        } 
        res.send(data)
    })

})

app.get('*', (req, res) => {

    res.render('404', {title: '404: Page not found', message: 'The page is not found'})

})

app.get('/here', (req, res) => {
    res.redirect('/about')
})


const PORT = process.env.PORT || 3000

console.log(PORT)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


