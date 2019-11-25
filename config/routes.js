const express = require('express');
const router = express.Router();
const authController = require('../middlewares/auth.middleware')
const roleController = require('../middlewares/role.middleware')
const baseController = require('../controllers/base.controller')
const userController = require('../controllers/user.controller')


module.exports = router;

// users routes
router.get('/', baseController.index)
router.get('/login', userController.login) 
router.post('/login', userController.doLogin)
router.get('/user/index', userController.index)
router.post('/logout', userController.logout)
router.get('/user/new',roleController.isAdmin , userController.new)