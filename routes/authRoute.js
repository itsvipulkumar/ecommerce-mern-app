const express = require('express')
// const userCollection = require('../models/user');
const controller = require('../controller/authController');
const middleware = require('../middleware/authMiddleware');
// import { hashPassord } from '../helper/authHelper';
// import { registerController } from '../controller/authController.js';


const router = express.Router();


router.post("/register", controller.registerController)
router.post("/login", controller.loginController)

router.get('/test', middleware.requireSignIn, middleware.isAdmin, controller.testController)

module.exports = router

