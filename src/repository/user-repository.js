const{User} = require('../models/index')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/server-config')

class UserRepository{

    async create(data){
        try{
           const user =await User.create(data);
           console.log(user)
           return user;
        }catch(error){
            console.log('something went wrong in repository layer');
            throw error;
        }
    }

    async destroy(userId){
        try{
            await User.destroy({
                where:{
                    id:userId
                }
            })

            return true;

        }catch(error){
            console.log('something went wrong in repository layer');
            throw error;
        }
    }

    async getById(userId){
        try{

            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user

        }catch(error){

            console.log('something went wrong in repository layer');
            throw error;

        }
        
    }

    createToken(user){
        try{
            const result = jwt.sign(user ,JWT_KEY ,{
                expiresIn:'1h'
            })

            return result

        }catch(error){

            console.log('something went wrong in token creation')
            throw error

        }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){

            console.log('something went wrong in token validation ')
            throw error

        }
    }
}

module.exports =UserRepository;