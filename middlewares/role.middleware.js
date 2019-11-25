module.exports.isAdmin = (req, res, next) => {
    if (req.session.user.rol === 'Admin') {
      next()
    } else {
      req.session.genericError = 'User is not a administrator!'
      res.redirect('/');
    }
  }