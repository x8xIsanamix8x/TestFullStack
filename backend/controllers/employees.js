const Users = require("../models/Users");

const getUsers = async (req, res = response) => {

    try {
        
        const allUsers = await Users.find({});

        res.status(200).json({
          ok: true,
          users: allUsers
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });

    }
    
}

module.exports = {
    getUsers
}