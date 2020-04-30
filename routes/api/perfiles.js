const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/verificar-token');

const User = require('../../models/UserModel')
const Perfil = require('../../models/PerfilModel')


/**
 * @route	GET api/perfiles/me
 * @des 	Informacion del perfil que inicio sesion
 * @access  Private
 */
router.get('/me', auth,  async function (req, res) {
	try {
        const perfil = await Perfil.findOne({ user : req.user.id })
            .populate('User', ['nombre', 'apellido', 'avatar']);

        return res.json(req.user);

        if (!perfil){
			res.status(404).json({
                errors : [{
                    msg : "Este no es el perfil de este usuario"
                }]
            });
		}

        res.json(perfil);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});



/**
 * @route	GET api/perfiles
 * @des 	Listado de todos los perfiles
 * @access  Public
 */
router.get('/', async function (req, res) {
	try {
        const perfiles = await Perfil.find()
            .populate('user', ['nombre', 'apellido', 'avatar']);

        res.json(perfiles);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});


/**
 * @route	GET api/perfiles/user/:user_id
 * @des 	Visualiza el perfil de un usuario
 * @access  Public
 */
router.get('/user/:user_id', async function (req, res) {
	try {
        const { user_id } = req.params;

        const pefil = await Perfil.findOne({ user : user_id })
            .populate('user', ['nombre', 'apellido', 'avatar']);

        if (!pefil){
            return res.status(400).json({
                msg : 'Perfil no encontrado'
            });
        }

        res.json(pefil);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});


/**
 * Crea o actualiza un perfil para el usaurio
 * 
 * @route	POST api/perfiles
 * @access  Private
 */
router.post('/', [ auth , 
    [
        check('bio_actual', 'Descripción del perfil es requerida')
            .not().isEmpty(),
        check('pais', 'Ingrese su páis')
        //check('habilidades', 'Habilidades son requeridas')
//            .not().isEmpty()
    ]], async function (req, res) {

    const errors = validationResult(req);        
    if (!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        });
    }

    const { bio_actual, habilidades } = req.body;

    // Informacion a ser insertada en el campo perfil
    let perfilTmp = {};
    perfilTmp.user = req.user.id;

    if (bio_actual) perfilTmp.bio_actual = bio_actual;
    if (habilidades) {
        perfilTmp.habilidades = habilidades.split(',').map(
            habilidad => habilidad.trim()
        );
    }
    

    try {
        let perfil = await Perfil.findOne({ user : req.user.id });
        if (perfil){

            perfil = await Perfil.findOneAndUpdate(
                { user : req.user.id }, 
                { $set : perfilTmp },
                { new : true }
            );

            res.json(perfil);
        }

        // Crear
        perfil = new Perfil(perfilTmp);
        await perfil.save();

        res.json(pefil);

    } catch (error) {
        //console.log(error.message);
        res.status(500).json('Server error');
    }

});



module.exports = router;