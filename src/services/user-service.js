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

    async signIn(email,password){
        try{
            // step 1 -> fetch the user using email
            console.log(`I am email in ${email} `)
            const user = await this.userRepository.getByEmail(email);
            // step2 -> compare incoming plain password with encrypted stored password
            const passwordmatch = this.checkPassword(password,user.password)

            if(!passwordmatch){
                console.log("Password does not match")
                throw{error:'Incorrect password'}
            }

            //step3 -> if password matched then create a token
            const newJWt =this.createToken({email:user.email,id:user.id});
            return newJWt;

        }catch(error){
            console.log('something went wrong in sign in process');
            throw error ;
        }
    }

async isAuthenticated(token){
    try{
        const response = this.verifyToken(token)
        if(!response){
            throw {error:'Invalid Token'}
        }

        const user= this.userRepository.getById(response.id);
        if(!user){
            throw {error:'No user with the corresponding token exists '}
        }

        return user.id;
    }catch(error){
        console.log('something went wrong in sign in process');
        console.log(error);
        throw error ;

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