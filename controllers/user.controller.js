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
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    db.get('users').push(req.body).write()
    res.redirect("/users")
};

module.exports.cookie = (req,res,next)=>{
    res.cookie('user-id',12345)
    res.send('hello');
};