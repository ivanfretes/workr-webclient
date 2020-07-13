const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')
const sentry = require('@sentry/node')

const app = express();

// Connect Database
connectDB();

sentry.init({ dsn: 'https://b1fc96f04be6434487e1414a5e0d6338@o313309.ingest.sentry.io/5217032' });

app.use(sentry.Handlers.requestHandler());
app.use(bodyParser.json())

/** 
 * Routes -API
 */

app.get('/', (req, res) => {
    res.json('api v1');
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/empleos', require('./routes/api/empleos'));
app.use('/api/postulaciones', require('./routes/api/empresas'));
app.use('/api/empresas', require('./routes/api/empresas'));
app.use('/api/perfiles', require('./routes/api/perfiles'));
app.use('/api/proyectos', require('./routes/api/proyectos'));


// The error handler must be before any other error middleware and after all controllers
app.use(sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log("Iniciando servidor "));