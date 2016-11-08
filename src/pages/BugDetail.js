import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import BugInputTable from './components/BugInputTable'
import HistoryBar from './components/HistoryBar'
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';

export default class bugDetail extends React.Component {  
 

  constructor(props) {
        super(props);
        this.state = { bug: {},
        			   bugStatus:[],
        			   updateTable:false, 
        			   user:"Gawen",   //need use session 
        			 };
    }

  componentWillMount() {       
    $.ajax('/api/bug/' + this.props.params.id).done(function(alldata) {  
      console.info("deatil componentWillMount") 
      console.info(alldata)   
      this.setState({bug: alldata});
    }.bind(this));

    $.ajax('/api/bugStatusAll').done(function(data) {      
      this.setState({bugStatus: data});
    }.bind(this));
  }

  handleUpdate() {
	this.setState({updateTable:true});
  }

  handleUpdateSave(bug) {  	  	
  	$.ajax({
      url: '/api/bugs/' + this.state.bug._id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(data) {   
      	//console.info(data);     
        this.setState({updateTable:false,
        				bug:data,
        			});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error update bug:", err);
      }
    });
  }

  handleHome(){
  	const path = '/';
    browserHistory.push(path);
  }


  render() {  	
  	
    return (      
      <div className="container">  
	    {
	      	this.state.updateTable
              ? <BugInputTable saveBugInfo={ this.handleUpdateSave.bind(this)} bugInfo= {this.state.bug} loginUser={this.state.user} bugStatus={this.state.bugStatus}/>
              :    
	      	<div>
	      		<MuiThemeProvider muiTheme={getMuiTheme({})}> 
	      		<Paper zDepth={1} style={{marginTop: 10, marginBottom: 10, width:'100%'}}>
			        <Table>
			          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			            <TableRow>
			              <TableHeaderColumn >Title: {this.state.bug.title}</TableHeaderColumn>
			            </TableRow>
			          </TableHeader>
			          <TableBody stripedRows={true} displayRowCheckbox={false}>
			            <TableRow>
				          <TableHeaderColumn >Date: {this.state.bug.timestamp}</TableHeaderColumn>
				       	</TableRow>
				       	<TableRow>
				          <TableHeaderColumn style={{width: '34%'}}>Feature: {this.state.bug.feature}</TableHeaderColumn>
				          <TableHeaderColumn style={{width: '32%'}}>Priority: {this.state.bug.priority}</TableHeaderColumn>
				          <TableHeaderColumn style={{width: '34%'}}>Status: {this.state.bug.status}</TableHeaderColumn>
				       	</TableRow>
				       	<TableRow>
				          <TableHeaderColumn style={{width: '34%'}}>Owner: {this.state.bug.owner}</TableHeaderColumn>
				          <TableHeaderColumn style={{width: '34%'}}>Submitter: {this.state.bug.submitter}</TableHeaderColumn>
				          <TableHeaderColumn style={{width: '32%'}}>Version: {this.state.bug.version}</TableHeaderColumn>
				       	</TableRow>       
				       	<TableRow>  (this.state.priorityTmp !==' ' ) && this.state.priorityTmp || ''
				          <TableHeaderColumn ><article>History:</article></TableHeaderColumn>
				          <TableHeaderColumn ><HistoryBar historyData={  (!this.state.bug.history ) && [{historyStatus:' ',historyUser:' '}] || this.state.bug.history} loginUser={this.state.user}/></TableHeaderColumn >				          	
				       	</TableRow>
				       	<TableRow>  
				          <TableHeaderColumn ><article>Comment: {this.state.bug.comment}</article></TableHeaderColumn>
				       	</TableRow>
			          </TableBody>
			        </Table>
			        <RaisedButton className="bugDetail_updateBtn" label="Update" onClick={this.handleUpdate.bind(this)}/>
			        <RaisedButton className="bugDetail_homeBtn" label="Back to Home" onClick={this.handleHome.bind(this)}/>  
			     </Paper>
			      		           
			     </MuiThemeProvider > 
			    		     
	      </div>
	  	}
      </div>
     
    );
  }
}