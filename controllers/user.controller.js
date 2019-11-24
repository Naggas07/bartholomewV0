const mongoose = require('mongoose')
const User = require('../models/user.model')

module.exports.login = (req, res, next) => {
    res.render('user/login')
}

module.exports.doLogin = (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.render('user/login', { user: req.body })
      }

    User.findOne({ username: username})
        .then(user => {
            if(!user){
                res.render('users/login', {
                    user: req.body,
                    error: { password: 'invalid password' }
                })
            }else{
                return user.checkPassword(password)
                    .then( match => {
                        if(!match){
                            res.render('users/login', {
                                user: req.body,
                                error: { password: 'invalid password' }
                            })
                        }else{
                            req.session.user = user;
                            req.session.genericSuccess = 'Welcome!'
                            res.redirect('user/index');
                        }
                    })
            }
        })
        .catch(error => next(error))
}