const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

let userRoute = require('./routes/user.route')
let authRoute = require('./routes/auth.route')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cookieParser());

app.use('/users',userRoute)
app.use('/auth',authRoute)


app.get('/', (req, res) => res.render('index', {
    name: 'Dung'
}))

app.listen(port, () => console.log(`app listening on port ${port}!`))