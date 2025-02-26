const { generateJWT } = require("../helpers/jwt");
const Users = require("../models/Users");
const bcrypt = require('bcryptjs');


const createUser = async (req, res = response) => {
    console.log('Inicio de createUser');
    const { email, password } = req.body;

    try {
        let user = await Users.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'There was an error creating the account'
            });
        }

        user = new Users(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        console.log('Usuario guardado, enviando respuesta');
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            lastName: user.lName
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
}


const loginUser = async (req, res = response) => {

    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: 'The user is not valid'
        });
      }
  
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'There has been an authentication error'
        });
      }
      
      const token = await generateJWT(user.id, user.name);
  
      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        lastName: user.lName,
        role: user.role,
        token
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator'
      });
    }
};

module.exports = {
    createUser,
    loginUser
}