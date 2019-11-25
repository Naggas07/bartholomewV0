const mongoose = require('mongoose')
const User = require('../models/user/user.model')

module.exports.login = (req, res, next) => {
    res.render('user/login')
}

module.exports.doLogin = (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.render('user/login', { user: req.body })
    }

    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                res.render('users/login', {
                    user: req.body,
                    error: { password: 'invalid password' }
                })
            } else {
                return user.checkPassword(password)
                    .then(match => {
                        if (!match) {
                            res.render('users/login', {
                                user: req.body,
                                error: { password: 'invalid password' }
                            })
                        } else {
                            User.findByIdAndUpdate({ _id: user._id }, { lastLogin: new Date() }, { new: true })
                            req.session.user = user;
                            req.session.genericSuccess = 'Welcome!'
                            res.redirect('/');
                        }
                    })
            }
        })
        .catch(error => next(error))
}

module.exports.index = (req, res, next) => {
    res.render('user/index', { user: req.currentUser })
}

module.exports.new = (req, res, next) => {
    res.render('user/new')
}

module.exports.save = (req, res, next) => {
    const { username, name, fullname, email, password, image, rol, department } = req.body

    if (!name || !fullname || !email || !username || !password || !rol) {
        console.log(req.body)
        res.render('user/new', { user: req.body })
    } else {
        const user = new User({
            name,
            username,
            fullname,
            email,
            rol,
            image,
            department,
            validated: true
        })

        user.save()
            .then(user => {
                res.redirect('/login')
            })
            .catch(error => {
                if (error instanceof mongoose.Error.ValidationError) {
                    res.render('user/new', { user, error: error.errors })
                } else if (error.code === 11000) {
                    res.render('user/new', {
                        user: {
                            ...user,
                            password: null
                        },
                        genericError: 'User exists'
                    })
                } else {
                    next(error);
                }
            }

            )
    }
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}