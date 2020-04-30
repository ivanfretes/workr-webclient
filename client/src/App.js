import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

import './App.css';

//import { Landing } from './componets/layaout/Landing';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/*Fragment>
  <Navbar/>
  <Route exact path="/" component={ Landing } ></Route>


  <section className="container">
    <Switch>
      <Route exact path="/register" ></Route>
      <Route exact path="/login" ></Route>
    </Switch>
  </section>
</Fragment*/}
      <Button variant="contained" color="primary">
        Hola Mundo!
      </Button>

    </Router>
  );
}

export default App;
