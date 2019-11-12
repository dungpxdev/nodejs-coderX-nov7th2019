const express = require('express')
const bodyParser = require('body-parser')
const lowdb = require('lowdb')
const shortid = require('shortid')

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')

db = lowdb(adapter)

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

db.defaults({
        users: []
    })
    .write()

app.listen(port, () => console.log(`app listening on port ${port}!`))







app.get('/', (req, res) => res.render('index', {
    name: 'Dung'
}))

app.get('/users', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}))

app.get('/users/search', (req, res) => {

    let q = req.query.q;

    const matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUsers
    });
})

app.get('/users/create', (req, res) => res.render('users/create'))

app.post('/users/create', (req, res) => {
    let id = shortid.generate();
    let name = req.body.name;
    const user = {
        id: id,
        name: name
    }
    db.get('users').push(user).write()
    res.redirect("/users")
})

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view',{user:user})
    console.log(user.name);
})