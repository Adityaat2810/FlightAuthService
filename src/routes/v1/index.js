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

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
    
)

router.get(
    '/dummy',(req,res)=>{
        return res.status(200).json({message:'ok'})
    }

)

module.exports=router;