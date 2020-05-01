import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Componets
import TopBar from './components/template/TopBar';
import Login from './components/pages/Login';
import Register  from './components/pages/Register';
import Index  from './components/pages/Index';

function App() {
    return (
        <Router>
            <TopBar />
            <Container component="main" maxWidth="xl">

                <Route exact path="/" component={Index} />
                
                <Switch>
                    <Route exact path="/register" component={Register}>

                    </Route>
                    <Route exact path="/login" component={Login}></Route>
                </Switch>
                
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container> 
        </Router>
  );
}


/**
 * Componente de Copyright en el footer
 */

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://workr.it/">
        Workr.it
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default App;
