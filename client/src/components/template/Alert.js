import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import PropTypes from "prop-types";


export const AlertComponent = ({ alerts }) => (
    alerts !== null && 
    //alerts.length > 0 && 
    alerts.map(alert => {
        console.log('Ok')
        return (<div>Pruebs</div>);
        //return (<Alert severity={alert.alertType} id={alert.id}>{alert.msg}</Alert>);
    })
);




Alert.propTypes = {
    alerts : PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    alers : state.alert
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent)
