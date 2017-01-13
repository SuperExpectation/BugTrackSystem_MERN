import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {  HomeContainer, NewBug, ServerError,EditBug} from './pages';
import { Router, Route, browserHistory } from 'react-router';

import { connect, Provider } from 'react-redux';


require("font-awesome/css/font-awesome.css");



const store = configureStore()

render(<Provider store={store}>		
		<Router history={browserHistory}>
	    	<Route path='/' component={HomeContainer}>
	    		<Route path="/bugAdd" component={NewBug} > </Route>
	    		<Route path="/bugEdit/:id" component={EditBug} > </Route>
	        </Route>	 
		    <Route path="error" component={ServerError} />
	  	</Router>  
		</Provider>, document.getElementById('app-container'));


module.hot.accept();
