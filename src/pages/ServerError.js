import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

const styles={
 root:{
 textAlign:'center'
 },
 alert:{
 fontSize:80,
 fontWeight: 'bold',
 color:'#e9ab2d'
 }
};
export default class ServerError extends Component {
 render() {
 return (
 <div style={styles.root}>
 <div style={styles.alert}>&#9888; </div>
 {/* &#9888; is the html entity code for the warning character: ⚠ */}
 <h1>Ops, we have a problem</h1>
 <p>Sorry, we could't access the repositories. Please try again in a few moments.</p>
 </div>
 );
 }
}

