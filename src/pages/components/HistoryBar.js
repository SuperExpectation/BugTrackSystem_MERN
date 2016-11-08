import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'; 
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Colors from 'material-ui/styles/colors'; 
import Paper from 'material-ui/Paper';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';


export default class HistoryBar extends React.Component {  
  constructor(props) {
    super(props); 
    this.state = { data: this.props.historyData,};       
  }

  componentWillReceiveProps() {       
    
    this.setState({data: this.props.historyData});
    
  }

  render() { 
    var mstatus = []; 
    
    //var titleTmp, featureTmp,statusTmp,priorityTmp,ownerTmp,submitterTmp,historyTmp,commentTmp;   
    this.state.data.forEach(function(item,index){             
      mstatus.push(        
        <Step key={index}>
          <StepLabel key={index}>{item.historyStatus} --&gt; {item.historyUser}</StepLabel>          
        </Step>
          
      )
    })

    return (
      
      <div className="historyBar"> 
        <MuiThemeProvider muiTheme={getMuiTheme({})}>         
                  <Stepper activeStep={this.state.data.length}>
                    {mstatus}
                  </Stepper> 
	      </MuiThemeProvider>
      </div>
     
    );
  }
}
