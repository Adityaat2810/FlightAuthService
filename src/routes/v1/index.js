const express = require('express');
const UserController =require('../../controllers/user-controller')
const router = express.Router();
const {AuthValidatorMiddleware} =require('../../middlewares/index')

router.post(
    '/signup',
    AuthValidatorMiddleware.validateUserAuth,
    UserController.create
    );

router.post(
    '/signin',
    AuthValidatorMiddleware.validateUserAuth,
    UserController.signIn
    )

module.exports=router;