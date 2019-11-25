const express = require('express');
const router = express.Router();
const authController = require('../middlewares/auth.middleware')
const roleController = require('../middlewares/role.middleware')
const baseController = require('../controllers/base.controller')
const userController = require('../controllers/user.controller')


module.exports = router;

// users routes
router.get('/', authController.isAuthenticated, baseController.index)
router.get('/login', authController.isNotAuthenticated, userController.login)
router.post('/login', authController.isNotAuthenticated, userController.doLogin)
router.get('/user/index', authController.isAuthenticated, userController.index)
router.post('/logout', authController.isAuthenticated, userController.logout)
router.get('/user/new', authController.isAuthenticated, roleController.isAdmin, userController.new)
router.post('/user/new', authController.isAuthenticated, roleController.isAdmin, userController.new)