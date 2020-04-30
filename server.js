const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')

const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json())

/** 
 * Routes -API
 */

app.get('/', (req, res) => {
    res.send('API Runing')
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/empleos', require('./routes/api/empleos'));
app.use('/api/postulaciones', require('./routes/api/empresas'));
app.use('/api/empresas', require('./routes/api/empresas'));
app.use('/api/perfiles', require('./routes/api/perfiles'));



const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log("Iniciando servidor "));