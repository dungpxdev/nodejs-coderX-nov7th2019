const db = require('../db')
const md5 = require('md5')

module.exports.login = (req, res) => res.render('auth/login')

module.exports.postLogin = (req, res) => {
    let userName = req.body.username;
    let password = req.body.password;
    console.log(userName+" cong "+password);

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

    let hashedPassword = md5(password);
    console.log(hashedPassword);

    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors:[
                'Wrong Password!'
            ],
            values:req.body
        })
        return;
    }
    res.cookie('userId',user.id,{
      signed:true
    })
    res.redirect('/users');
}
