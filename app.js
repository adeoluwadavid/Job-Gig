const express = require('express')
const {engine} = require('express-handlebars')
const bodyparser = require('body-parser')
const path = require('path')

const db = require('./config/database')
const app = express()


app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine','handlebars')

app.use(express.static(path.join(__dirname,'public')))

db.sync()
db.authenticate().then(() => console.log('Database Connected')).catch(err => console.log('Error: ' + err))


app.use(bodyparser.urlencoded({extended: false}))

app.get('/', (req, res) => res.render('index',{layout:'landing'}))

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 8000


app.listen(PORT, console.log(`Server started on Port ${PORT}`));