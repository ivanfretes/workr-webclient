const express = require('express');
const router = express.Router();

const Empresa = require('../../models/EmpresaModel')

/**
 * Listado de Empresas
 */
router.get('/', async (req, res, next) => {
    
    try {
        const empresas = await Empresa.find()
        res.json(empresas);

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
});



router.get('/:emp_id', (req, res) => {
    try {
        
        //Empresa.
        //return Empresa.find();        

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})

module.exports = router;
