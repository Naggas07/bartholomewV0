const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller')
const userController = require('../controllers/user.controller')


module.exports = router;

router.get('/', baseController.index)
router.get('/login', userController.login) 
router.post('/login', userController.doLogin)
router.get('/user/index', userController.index)
router.post('/logout', userController.logout)