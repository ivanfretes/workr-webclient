import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';


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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


/**
 * Componente de Registro
 */
const Register = (props) => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido : '',
        email  : '',
        password : '',
        password2 : ''
    });

    const {
        nombre, apellido, email, password, password2
    } = formData;

    
    const onChangeInputForm = (e) => setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    });

    const onSubmitForm = async e => {
        e.preventDefault();

        if (password != password2) {
            console.log();
            props.setAlert('Contraseñas no coinciden', 'danger')
        } else {
            try {
                const res = await axios.post('/api/users', JSON.stringify({ ...formData }), {
                    headers : { 
                        'Content-Type' : 'application/json'
                    }
                });

                
                //console.log();
            } catch (error) {
                console.log(error.response.data);
            }
            
        }
    }


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cree una cuenta
        </Typography>
                <form className={classes.form} noValidate onSubmit={e => onSubmitForm(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="nombre"
                                name="nombre"
                                variant="outlined"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                autoFocus
                                value={nombre}
                                onChange={e => onChangeInputForm(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="apellido"
                                label="Apellido"
                                name="apellido"
                                autoComplete="apellido"
                                value={apellido}
                                onChange={e => onChangeInputForm(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => onChangeInputForm(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => onChangeInputForm(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Confirmar Contraseña"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                value={password2}
                                onChange={e => onChangeInputForm(e)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrarse
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Ya tienes una cuenta?, Iniciar Sesión"}
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}


export default connect(null, { setAlert })(Register);