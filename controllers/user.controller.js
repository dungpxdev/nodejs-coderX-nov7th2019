const shortid = require('shortid')

const db = require('../db')

module.exports.index = (req, res) => res.render('users/index', {
    users: db.get('users').value()
})

module.exports.search = (req, res) => {

    let q = req.query.q;

    const matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = (req, res) => res.render('users/create')

module.exports.get = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view', {
        user: user
    })
    console.log(user.name);
};

module.exports.postCreate = (req, res) => {
    let id = shortid.generate();
    let phone = req.body.phone;
    let name = req.body.name;
    const user = {
        id: id,
        name: name,
        phone:phone
    }
    db.get('users').push(user).write()
    res.redirect("/users")
};