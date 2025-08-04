const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const {upgradePlan} = require('../controllers/upgradeController')

const router = express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/upgrade',upgradePlan)


module.exports=router