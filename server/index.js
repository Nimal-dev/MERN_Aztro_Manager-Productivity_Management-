
const express = require('express')
const db = require('./database')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')
var expressFileupload = require('express-fileupload');
var session = require('express-session')

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressFileupload());

app.use(cors())

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 5000

const homeRouter = require('./Admin/register.router')
const userRouter = require('./user/user.router')

db()


app.get('/', (req, res) => { res.send('Loaded') })
app.use('/Admin', homeRouter)
app.use('/user', userRouter)

app.listen(port, () => { console.log('Server Is Running') })