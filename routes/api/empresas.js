const express = require('express');
const router = express.Router();
import Empresa from "../../models/EmpresaModel";
import User from '../../models/UserModel';

/**
 * Listado de Empresas
 */
router.get('/', function(req, res, next) {
    
    try {
        const empresas = Empresa.find({});
        res.json(empresa)  

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
});



router.get('/:emp_id', (req, res) => {
    try {
        
        //Empresa.
        

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }
})

module.exports = router;
