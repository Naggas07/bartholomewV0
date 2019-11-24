const mongoose = require('mongoose')

module.exports.login = (req, res, next) => {
    res.render('user/login')
}