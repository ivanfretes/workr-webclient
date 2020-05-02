import React from 'react'
import UserList from "../partials/UserList";
import HeaderIndex  from '../template/HeaderIndex';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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

const Index = () => {
    return (
    <div>
        <HeaderIndex content={ headerContent }/>
        <Link to="/">Inicio</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/register">Crear una cuenta</Link>
    </div>
    )
}

export default Index
