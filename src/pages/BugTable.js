import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';


 
export default class BugTable extends React.Component {  
  constructor(props) {
    super(props); 
    this.state = {   };
  }

  

  render() {
    //console.log("Rendering bug table, num items:", this.props.bugs.length);
    
      
    
    var bugRows = this.props.bugs.map(function(bug) {
      return <BugRow key={bug._id} bug={bug} />
    });
    return (
      <Paper zDepth={1} style={{marginTop: 10, marginBottom: 10, width:'100%'}}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{width: 240}}>Id</TableHeaderColumn>
              <TableHeaderColumn style={{width: 120}}>Status</TableHeaderColumn>
              <TableHeaderColumn style={{width: 80}}>Priority</TableHeaderColumn>
              <TableHeaderColumn style={{width: 120}}>Owner</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true}>
            {bugRows}
          </TableBody>
        </Table>
        
      </Paper>
    )
  }

  
}

var BugRow = React.createClass({
  getStyle: function(width, bug) {
    var style = {height: 24};
    if (width) style.width = width;
    if (bug.priority == 'P1') style.color = 'red';
    return style;
  },

  render() {
    //console.log("Rendering BugRow:", this.props.bug);
    var bug = this.props.bug;
    return (
      <TableRow>
        <TableRowColumn style={this.getStyle(240, bug)}>
          <Link to={'/bug/' + bug._id}>{bug.id}</Link>
        </TableRowColumn>
        <TableRowColumn style={this.getStyle(120, bug)}>{bug.status}</TableRowColumn>
        <TableRowColumn style={this.getStyle(80, bug)}>{bug.priority}</TableRowColumn>
        <TableRowColumn style={this.getStyle(120, bug)}>{bug.owner}</TableRowColumn>
        <TableRowColumn style={this.getStyle(undefined, bug)}>{bug.title}</TableRowColumn>
      </TableRow>
    )
  }
});
