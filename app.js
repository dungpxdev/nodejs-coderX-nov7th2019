const express = require('express')
const bodyParser = require('body-parser')

let userRoute = require('./routes/user.route')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/users',userRoute)


app.get('/', (req, res) => res.render('index', {
    name: 'Dung'
}))

app.listen(port, () => console.log(`app listening on port ${port}!`))