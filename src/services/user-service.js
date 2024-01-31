const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/server-config')
const bcrypt = require('bcrypt')
class Userservice {

    constructor() {

        this.userRepository = new UserRepository();

    }

    async create(data) {
        try {

            const user = await this.userRepository.create(data);
            console.log(user);
            return user;

        } catch (error) {
            console.log('something went wrong in service layer');
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

    checkPassword(userInputPlainPassword , encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        }catch(error){
            console.log('something went wrong in password comparison ')
            throw error
        }
    }

}

module.exports = Userservice;