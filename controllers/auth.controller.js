const db = require('../db')

module.exports.login = (req, res) => res.render('auth/login')

module.exports.postLogin = (req, res) => {
    let userName = req.body.username;
    console.log(userName);
    let user = db.get('users').find({name:userName}).value();
    
    if(!user){
        res.render('auth/login',{
            errors:[
                'User doesn\'t exists !'
            ],
            values:req.body
        })
        return;
    }

    let password = req.body.password;
    console.log(password);
    let pass = db.get('users').find({password:password}).value();
    if(password !== pass){
        res.render('auth/login',{
            errors:[
                'Wrong Password!'
            ],
            values:req.body
        })
        return;
    }
    res.redirect('/users');
}
