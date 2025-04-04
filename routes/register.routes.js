const express = require('express');
const userController = require('../controllers/userRegistercontroller');



const router = express.Router()

router.post('/', userController)


module.exports = router