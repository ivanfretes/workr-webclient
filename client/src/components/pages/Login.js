import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const { email , password } = formData;

  const onChangeInputForm = e => setFormData({
    ...formData,
    [e.target.name] : e.target.value
  });

  const onSubmitForm = async e => {
    e.preventDefault();

    if (password.trim() != ''){

      try {
        const res = await axios.post('/api/auth', JSON.stringify(formData) , {
          headers : {
            'Content-Type' : 'application/json'
          }
        });

        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }

      
    } else {
      console.log('Password es requerido')
    }
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmitForm(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => onChangeInputForm(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => onChangeInputForm(e)}
          />
          {/*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Acceder
          </Button>

          <Grid container>
            {/*<Grid item xs>
              <Link href="#" variant="body2">
                Olvitaste la contraseña
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/register" variant="body2">
                {"Todavia no tienes una cuenta?, Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}