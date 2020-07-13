const jwt = require('jsonwebtoken');
const config = require('config');


/** 
 * Casos:
 * 1. Si no existe token (no inicializado)
 * 2. Exception de token invalido o exipirado
 * 3. Pasa el request y almacena la Informacion del Usaurio
 */
module.exports = function(req, res, next){
    const token = req.header('x-auth-token');

    if (!token){
        return res.status(404).json({ msg : 'Token no inicializado'})
    }
    try {
        const decode = jwt.decode(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg : 'Token expirado o no valido'});
    }
}

