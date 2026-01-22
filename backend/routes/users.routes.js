const express = require('express');
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const {UserValidator} = require("../validations/validations.index");
const {UserControllers} = require("../controllers/index.controllers");
const UserRouter = express.Router();

UserRouter.post('/register',validate(UserValidator.registerSchema),UserControllers.registerUser);
UserRouter.post('/login',validate(UserValidator.loginSchema),UserControllers.loginUser);
UserRouter.get('/logout',auth,UserControllers.logoutUser);

module.exports = UserRouter;