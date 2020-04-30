import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';

//import { Landing } from './componets/layaout/Landing';

import TopBar from './components/template/TopBar';
import Login from './components/pages/Login';
import Register  from './components/pages/Register';

function App() {
    return (
        <Router>
            <Fragment>
                <TopBar />
                 <Link to="/">Inicio</Link>
                 <Link to="/login">Ingresar</Link>
                 <Link to="/register">Crear una cuenta</Link>
                <Route exact path="/" >
                    
                </Route>
                
            
                <Switch>
                    <Route exact path="/register" component={Register}>

                    </Route>
                    <Route exact path="/login" component={Login}></Route>
                </Switch>
                    
                </Fragment>
        </Router>
  );
}

export default App;
