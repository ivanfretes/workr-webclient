import React from 'react'
import UserList from "../partials/UserList";
import HeaderIndex  from '../template/HeaderIndex';
import { BrowserRouter as Router, Link } from 'react-router-dom';
/**
 * Box de la pagina principal (Abajo del header)
 */
const headerContent = {
  title : `Una nueva forma de conectar ideas`,
  date : '',
  description : 'Bienvenido al espacio ideal para conocer nuevas personas y proyectos en tu ambiente de trabajo',
  image : 'https://workr.it/images/undraw_work_time_lhoj.svg', 
  imageTitle : 'Imagen Principal'
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
