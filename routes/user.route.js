const express = require('express')
const shortid = require('shortid')

const db = require('../db')

let router = express.Router()


router.get('/', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}))

router.get('/search', (req, res) => {

    let q = req.query.q;

    const matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUsers
    });
})

router.get('/create', (req, res) => res.render('users/create'))

router.post('/create', (req, res) => {
    let id = shortid.generate();
    let name = req.body.name;
    const user = {
        id: id,
        name: name
    }
    db.get('users').push(user).write()
    res.redirect("/users")
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view',{user:user})
    console.log(user.name);
})

module.exports = router