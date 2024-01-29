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


module.exports = {
    create
}