const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const validateFields = (req, res, next) => {
    console.log('Validando campos...');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('Campos validados correctamente');
    next();
};

const validateJWT = (req, res, next) => {
  
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }

  next();
};
  

module.exports = {
    validateFields,
    validateJWT
}