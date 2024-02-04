const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {
    try {
        console.log(req.body);

        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });

        console.log(response);


        return res.status(201).json({
            success: true,
            message: 'successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}


const signIn = async(req,res)=>{

    console.log(req.body.email)
    try{
        

        const response = await userService.signIn(req.body.email,req.body.password);
        console.log("Response is: ",response)
        return res.status(200).json({
            data: response, 
            message: "Successfully signed in with the JWT Token",
            err: {},
            success: true
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });

    }
}

const isAuthenticated=async(req,res)=>{
    try{
      const token = req.headers['x-access-token']
      console.log(token)
      const response=userService.isAuthenticated(token);
      return res.status(200).json({
        success:true,
        err:{},
        data:response,
        message:"user is authenticated and token is valid"
      })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}