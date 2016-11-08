import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import {  HomePage, BugDetail, BugAdd} from './pages';
import '../build/css/app.css';
require("font-awesome/css/font-awesome.css");


ReactDOM.render(
  <Router history={browserHistory} >
	  <Route path='/' component={HomePage}> </Route>	 
	  <Route path="/bug/:id" component={BugDetail} ></Route>
	  <Route path="/bugAdd" component={BugAdd} ></Route>
	  
  </Router>,
  document.getElementById('app-container')
);