const mongoose = require('mongoose')


module.exports.index = (req, res, next) => {
    if(!req.currentUser){
        res.redirect('/login')
    }else{
        res.redirect('/user/index')
    }
    
}