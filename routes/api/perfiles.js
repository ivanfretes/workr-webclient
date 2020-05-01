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
            .populate('user', ['nombre', 'apellido']);

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
 * Actualiza la foto de perfil de un usuario
 */
router.post('/me/avatar', auth, (req, res) => {
    return res.json(req.headers);
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
        check('pais', 'Ingrese su páis').not().isEmpty(),
        check('habilidades', 'Menciona tus habilidades')
            .not().isEmpty()
    ]], async function (req, res) {

    const errors = validationResult(req);        
    if (!errors.isEmpty()){
        res.status(400).json({
            errors : errors.array()
        });
    }

    const { 
        pais, 
        bio_actual, 
        habilidades,
        cargo,
        estado_actual,
        consideracion_experiencia,
        avatar,
        celular,
        experiencia_total,
        fecha_nacimiento,
        posibilidad_remoto,
        empresa_actual,
        freelance,
        movilidad_propia,
        salario_pretendido,
        tipo_acceso, 
        ciudad,
        geoubicacion,
        facebook,
        twitter,
        instagram,
        linkedin,
        mi_web,
    } = req.body;

    // Informacion a ser insertada en el perfil
    let perfilTmp = {};
    perfilTmp.user = req.user.id;

    if (bio_actual) perfilTmp.bio_actual = bio_actual;
    if (pais) perfilTmp.pais = pais;
    if (habilidades) {
        perfilTmp.habilidades = habilidades.split(',').map(
            habilidad => habilidad.trim()
        );
    }
    if (cargo) perfilTmp.cargo = cargo;
    if (estado_actual) perfilTmp.estado_actual = estado_actual;
    if (avatar) perfilTmp.avatar = avatar;
    if (experiencia_total) perfilTmp.experiencia_total = experiencia_total;
    if (celular) perfilTmp.celular = celular;
    if (fecha_nacimiento) perfilTmp.fecha_nacimiento= fecha_nacimiento;
    if (posibilidad_remoto) perfilTmp.posibilidad_remoto = posibilidad_remoto;
    if (empresa_actual) perfilTmp.empresa_actual = empresa_actual;
    if (freelance) perfilTmp.freelance = freelance;
    if (movilidad_propia) perfilTmp.movilidad_propia = movilidad_propia;
    if (salario_pretendido) perfilTmp.salario_pretendido = salario_pretendido;
    if (tipo_acceso) perfilTmp.tipo_acceso = tipo_acceso;
    if (ciudad) perfilTmp.ciudad = ciudad;
    //if (geoubicacion.lat && geoubicacion.long) perfilTmp.geoubicacion = geoubicacion;
    if (consideracion_experiencia) perfilTmp.consideracion_experiencia = consideracion_experiencia;

    // Geoubicacion
    perfilTmp.geoubicacion = {}

    // Redes Sociales
    perfilTmp.redes_sociales = {};
    if (facebook) perfilTmp.redes_sociales.facebook = facebook;
    if (twitter) perfilTmp.redes_sociales.twitter = twitter;
    if (instagram) perfilTmp.redes_sociales.instagram = instagram;
    if (linkedin) perfilTmp.redes_sociales.linkedin = linkedin;
    if (mi_web) perfilTmp.redes_sociales.mi_web = mi_web;

    try {
        let perfil = await Perfil.findOne({ user : req.user.id });
        if (perfil){

            perfil = await Perfil.findOneAndUpdate(
                { user : req.user.id }, 
                { $set : perfilTmp },
                { new : true }
            );

        } else {
            perfil = new Perfil(perfilTmp);
            await perfil.save();
        }

        res.json(perfil);

    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }

});



module.exports = router;