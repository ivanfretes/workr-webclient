const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');


/**
 * Listado de usuarios, sin el campo password
 * 
 * @route	GET api/users
 * @access  Public
 */
router.get('/', async function (req, res) {
	let users = await User.find().select('-password');
	res.json({
		data: users
	});
});

/**
 * Listado de usuarios
 * 
 * @route	GET api/users
 * @access  Public
 */
router.get('/:id', async function (req, res) {
	let { id } = req.params

	try {
		let user = await User.findById(id)
		if (!user){
			res.status(404).json({errors : [{msg : "Usuario no encontrado"}]})
		}

		res.send(user);
	} catch (error) {
		res.status(500).send("Server error");
	}
});


/**
 * Nuevo Usuario
 * 
 * @route	POST api/users
 * @access  Public
 */
router.post('/', 
	[
		check('nombre', 'Nombre es Requerido').not().isEmpty(),
		check('apellido', 'Apellido es Requerido').not().isEmpty(),
		check('email', 'Ingrese un correo valido').isEmail(),
		check('password').isLength({min : 6 }),
		check('password2').custom((value, {req}) => {
			if (value !== req.body.password){
				throw new Error('Verifique su contraseña')
			}

			return true;
		})
	], async function (req, res) {
		
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			return res.status(400).json({ errors : errors.array() });
		}

		const { nombre, email, password, apellido, username } = req.body;

		try {
			user = await User.findOne({ email });
			if (user){
				res.status(400).json({errors : [{msg : "Usuario o correo no disponible"}]})
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm' 
			});

			user = new User({
				nombre,
				email,
				apellido,
				avatar,
				password
			});
			
			user.username = email;

			const salt = await bcrypt.genSaltSync(10);
			user.password = await bcrypt.hash(password, salt);
			
			await user.save();

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


/**	
 * Actualiza la informacion de un usuario
 */
router.put('/:id', function (req, res) {
	let id = req.params.id;

	let q = User.findByIdAndUpdate(id, {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		email: req.body.mail,
		celular: req.body.celular,
		empresa_actual: req.body.empresa_actual,
		dev: req.body.dev,
		freelance: req.body.freelance,
		posibilidad_remoto: req.body.posibilidad_remoto,
		dispone_vehiculo: req.body.dispone_vehiculo
	})

	q.then(user => {
		res.json({
			data: user,
			status: 'success'
		})
	}).catch(err => {
		console.log("--------\n")
		console.log(err)
		res.json({
			data: null,
			status: 'fail'
		})
	})
});


router.delete('/:id', async function (req, res) {
	let { id } = req.params;
	let user = await User.findByIdAndDelete(id);

	if (!user){
		res.status(400).json({errors : [{msg : "Usuario o correo no disponible"}]})
	}

	res.json({
		data: user,
		status: 'success'
	});
});

module.exports = router;