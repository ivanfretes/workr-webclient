const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/verificar-token');


/**
 * Retorna informacion del usuario, si el token se encuentra activo
 * 
 * @route	GET api/auth
 * @access  Public
 */
router.get('/me', auth,  async function (req, res, next) {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server error");
	}
});


/**
 * 
 * Autenticacion de usuario y get token
 * 
 * @route	POST api/auth
 * @access  Public
 */
router.post('/', 
	[
		check('email', 'Por favor ingrese un correo valido').isEmail(),
		check('password', 'Contraseña es requerida').exists()
	], async function (req, res) {
		
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			return res.status(400).json({ errors : errors.array() });
		}

		const { email, password } = req.body;

		try {
			user = await User.findOne({ email });
			if (!user){
				res.status(400).json({errors : [{msg : "Credenciales invalidos"}]})
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch){
				res.status(400).json({errors : [{msg : "Credenciales invalidos"}]})
			}


			const payload = {
				user : {
					id : user.id, 
					rol : user.rol
				}
			};

			jwt.sign(
				payload, 
				config.get('jwtSecret'), 
				{ expiresIn : 360000},
				(error, token) => {
					if (error) throw error;
					res.json({ token });
				}
			);
			
		} catch (error) {
			console.log(error)
			res.status(500).send("Server error");
		}
	}
);



module.exports =  router;