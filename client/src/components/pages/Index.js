import React, { Fragment } from 'react'
import UserList from "../partials/UserList";
import HeaderIndex  from '../template/HeaderIndex';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/**
 * Box de la pagina principal (Abajo del header)
 */
const headerContent = {
  title : `La nueva forma de conectar ideas, proyectos y empleo`,
  date : 'Registrarse',
  description : 'En workr vas a conocer a las próximas personas con las que vas a trabajar o iniciar un negocio',
  image : 'https://workr.it/images/undraw_work_time_lhoj.svg', 
  imageTitle : 'Imagen Principal',
  linkText : 'Registrarse',
  link : '/register'
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const proyectosTmp = [
    {
        nombre_proyecto : 'Proyecto 1',
        propietario : 'propietario',
        vinculo_requerid : 'vinculo_requerid',
        descripcion : 'descripcion',
        ciudad : 'ciudad',
        pais : 'pais',
        posibilidad_remoto : 'posibilidad_remoto',
        recursos_necesarios : 'recursos_necesarios',
        user : 'user',
        comentarios : 'comentarios',
    },

    {
        nombre_proyecto : 'Proyecto 2',
        propietario : 'propietario',
        vinculo_requerid : 'vinculo_requerid',
        descripcion : 'descripcion',
        ciudad : 'ciudad',
        pais : 'pais',
        posibilidad_remoto : 'posibilidad_remoto',
        recursos_necesarios : 'recursos_necesarios',
        user : 'user',
        comentarios : 'comentarios',
    },

    {
        nombre_proyecto : 'Proyecto 3',
        propietario : 'propietario',
        vinculo_requerid : 'vinculo_requerid',
        descripcion : 'descripcion',
        ciudad : 'ciudad',
        pais : 'pais',
        posibilidad_remoto : 'posibilidad_remoto',
        recursos_necesarios : 'recursos_necesarios',
        user : 'user',
        comentarios : 'comentarios',
    }
];

const Index = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <HeaderIndex content={ headerContent }/>
            <div>
                <Link to="/">Inicio</Link>
                <Link to="/login">Ingresar</Link>
                <Link to="/register">Crear una cuenta</Link>
            </div>
            
            <div>
                <List className={classes.root}>
                {
                    proyectosTmp.map(proyecto => {
                        return (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={proyecto.nombre_proyecto}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        )
                    })
                }
                </List>
            </div>
            
        </Fragment>
    )
}

export default Index
