import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import BugList from './BugList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Appbar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

export default class HomePage extends React.Component {  
  handleAddBtn() {
    const path = '/bugAdd';
    browserHistory.push(path);
  }

  render() {
    return (      
      <MuiThemeProvider muiTheme={getMuiTheme({})}>
      <div className="container">
        <Appbar title="Bug Tracker"   showMenuIconButton={false} iconElementRight={<FlatButton label="New Bug" onClick={this.handleAddBtn.bind(this)} />}/>      
        <BugList />
        
      </div>
      </MuiThemeProvider>
        
      
    );
  }
}


