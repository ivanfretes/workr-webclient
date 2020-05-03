import { Router } from "express"
import { check, validationResult } from "express-validator";
import Proyecto from "../../models/ProyectoModel";

const router = Router();

/**
 * Retorna el listado de proyectos
 */
router.get('/', (req, res) => {

    // Listado de Proyectos
});



/** 
 * Nuevo Proyecto
 */
router.post('/', auth , [
    check('nombre_proyecto', 'nombre_proyecto es requerido'), 
    check('vinculo_requerido', 'vinculo_requerido es requerido'),
    check('descripcion', 'descripcion es requerido'),
    check('ciudad', 'ciudad es requerido'),
    check('pais', 'pais es requerido'),
    check('posibilidad_remoto', 'posibilidad_remoto es requerido'),
    check('recursos_necesarios', 'recursos_necesarios es requerido')
],(req, res) => {
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

        
        Proyecto

    } catch (error) {
        
    }


});