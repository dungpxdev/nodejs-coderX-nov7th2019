const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.listen(port, () => console.log(`app listening on port ${port}!`))


let users = [{
        id: 1,
        name: 'dung'
    },
    {
        id: 2,
        name: 'huy'
    },
    {
        id: 1,
        name: 'phan'
    }
]

app.get('/', (req, res) => res.render('index', {
    name: 'Dung'
}))

app.get('/users', (req, res) => res.render('users/index', {
    users:users
}))

app.get('/users/search', (req, res) =>{

    let q =  req.query.q;

    const matchedUsers = users.filter(user=>user.name.indexOf(q) !== -1);

    res.render('users/index',{
        users : matchedUsers
    });
})