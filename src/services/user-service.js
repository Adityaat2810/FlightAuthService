const UserRepository = require('../repository/user-repository');

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

}

module.exports = Userservice;