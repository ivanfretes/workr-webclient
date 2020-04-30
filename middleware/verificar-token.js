const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    // Obtener el token
    const token = req.header('x-auth-token');

    // Si no existe el token
    if (!token){
        return res.status(404).json({ msg : 'No token, autorization denied'})
    }

    // Se verifica el token
    try {
        const decode = jwt.decode(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch (error) {
        res.status(401).json({msg : 'Token no es valido'});
    }
}

