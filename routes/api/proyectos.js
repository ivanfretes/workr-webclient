const { Router }= require('express');
const router = Router();
const {check, validationResult} = require('express-validator');


const Proyecto = require('../../models/ProyectoModel')
const auth = require('../../middleware/verificar-token');


/**
 * LIstado de proyectos
 * @method GET
 */
router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyecto.find()
            .populate('propietario', ['nombre', 'apellido', 'email']);
        res.json(proyectos);    
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
    
});


/**
 * Detalle de un proyecto
 * @method GET
 * @link /api/proyectos/:proy_id
 */
router.get('/:proy_id', async (req, res) => {
    
    try {
        const proyecto = await Proyecto.findOne({_id : req.params.proy_id })
            .populate('propietario', ['nombre', 'apellido', 'email']);
        res.json(proyecto);    
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
    
});


/** 
 * Nuevo Proyecto
 */
router.post('/', auth , [
    check('nombre_proyecto', 'nombre_proyecto es requerido').not().isEmpty(), 
    check('vinculo_requerido', 'vinculo_requerido es requerido').not().isEmpty(),
    check('descripcion', 'descripcion es requerido').not().isEmpty(),
    check('ciudad', 'ciudad es requerido').not().isEmpty(),
    check('pais', 'pais es requerido').not().isEmpty(),
    check('posibilidad_remoto', 'posibilidad_remoto es requerido').not().isEmpty(),
    check('recursos_necesarios', 'recursos_necesarios es requerido').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json(errors.array());
    }

    try {
        const {
            nombre_proyecto,
            vinculo_requerido,
            descripcion,
            ciudad,
            pais,
            posibilidad_remoto,
            recursos_necesarios,
        } = req.body;

        const proyectoTmp = {};
        if (nombre_proyecto) proyectoTmp.nombre_proyecto = nombre_proyecto;
        if (vinculo_requerido) proyectoTmp.vinculo_requerido = vinculo_requerido;
        if (descripcion) proyectoTmp.descripcion = descripcion;
        if (ciudad) proyectoTmp.ciudad = ciudad;
        if (pais) proyectoTmp.pais = pais;
        if (posibilidad_remoto) proyectoTmp.posibilidad_remoto = posibilidad_remoto;
        if (recursos_necesarios) proyectoTmp.recursos_necesarios = recursos_necesarios.split(',')
                .map( value => value.trim());

        proyectoTmp.propietario = req.user.id,
        proyecto = new Proyecto(proyectoTmp);
        await proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
        
    }
});



module.exports = router;