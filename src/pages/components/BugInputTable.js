import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import HistoryBar from './HistoryBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'; 
import {Card, CardHeader,CardActions, CardText} from 'material-ui/Card';
import Colors from 'material-ui/styles/colors'; 
import Paper from 'material-ui/Paper';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepLabel} from 'material-ui/Stepper';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';

export default class BugInputTable extends React.Component {  
  constructor(props) {
        super(props);         
        this.state = { availableStatus: this.props.bugStatus,
                        titleTmp : ' ',
                        featureTmp : ' ',
                        statusTmp : ' ',
                        priorityTmp : ' ',
                        ownerTmp : ' ',
                        submitterTmp : ' ',
                        versionTmp: ' ',
                        historyTmp : [],
                        commentTmp : [], 
                        user:this.props.loginUser,
                        statusNew:'', 
                        open: false,                       
                     };       
  }

  componentWillMount() {    
    if(this.props.bugInfo.title){
      this.setState({titleTmp : this.props.bugInfo.title,
      featureTmp : this.props.bugInfo.feature,
      statusTmp : this.props.bugInfo.status,
      statusNew : this.props.bugInfo.status,
      priorityTmp : this.props.bugInfo.priority,
      ownerTmp : this.props.bugInfo.owner,
      submitterTmp : this.props.bugInfo.submitter,
      versionTmp : this.props.bugInfo.version,
      commentTmp : this.props.bugInfo.comment,  });
    }  

    this.setState({submitterTmp : this.props.bugInfo.submitter}); 

    if(this.props.bugInfo.history){
      //console.info("BugInputTable:"+ this.props.bugInfo.history)
      this.setState({historyTmp : this.props.bugInfo.history});   
    }
  }

  handleAddSave() {
  	var histroyArr = this.state.historyTmp;
    //console.info(histroyArr);
    var title = this.state.titleTmp;  
    var feature = this.state.featureTmp;  
    var priority = this.state.priorityTmp;   
    var status = this.state.statusNew;  
    var owner = this.state.ownerTmp;  
    var submitter = this.state.submitterTmp;  
    var version = this.state.versionTmp; 
    
    var comment = this.state.commentTmp; 
    
    
    //console.info("title:"+ title + ", feature"+feature+" ,priority:"+ priority + ", status:"+status+" ,owner:"+ owner + ", submitter:"+submitter+" ,version:"+ version + ",  comment:"+comment);
  	if(title && feature && priority && feature && status && owner && version && comment.length!=0){  
      //console.info("old status:" + this.state.statusTmp);
      //console.info("new status:" + status);
      if(status != this.state.statusTmp || !this.state.statusTmp){
        //console.info("no equal");
        histroyArr.push({historyUser:this.state.user, historyStatus:status});
      }    
      
      var bug = {title:title,feature:feature,priority:priority,status:status,owner:owner,submitter:submitter,version:version,date:Date.now(),history:histroyArr,comment:comment}
      this.props.saveBugInfo(bug);
    }else{
      console.info("Error, Item with '*' must be filled!")
      alert("Error, Item with '*' must be filled!");
    }
  } 
  
  handleHome(){
    const path = '/';
    browserHistory.push(path);
  }

  titleChange(e){    
    this.setState({titleTmp: e.currentTarget.value});
  }

  featureChange(e){    
    this.setState({featureTmp: e.currentTarget.value});
  }

  priorityChange(e){    
    this.setState({priorityTmp: e.currentTarget.value});
  }

  handleStatusChange(event, index, value){    
    this.setState({statusNew:value});        
  }

  ownerChange(e){    
    this.setState({ownerTmp: e.currentTarget.value});
  }

  versionChange(e){    
    this.setState({versionTmp: e.currentTarget.value});
  }

  //need update object 
  commentChange(e){
    this.setState({commentTmp: e.currentTarget.value});
  }
  //need update object
  historyChange(e){
    this.setState({historyTmp: e.currentTarget.value});
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  render() {
    var mstatus = []; 
    //var titleTmp, featureTmp,statusTmp,priorityTmp,ownerTmp,submitterTmp,historyTmp,commentTmp;  	
  	this.state.availableStatus.forEach(function(item,index){  						
      mstatus.push(
        <MenuItem value={item} key={index} primaryText={item} />
      )
		})
    
    var divStyle = {
      width:'100%',
      
    };   
    var commonStyle = {
      width:'70%',
      margin:'0 auto 0 auto',
      
    };
    return (
      
      <div className="bugInputTable"> 
        <MuiThemeProvider muiTheme={getMuiTheme({})}> 
        <Card initiallyExpanded={true} style={divStyle}>        
          <CardHeader title={this.state.submitterTmp} subtitle="To fill all required item please"
            actAsExpander={true} 
            avatar={
              <Avatar backgroundColor={'#009688'} icon={
                <FontIcon className="fa fa-user-o"></FontIcon>
              }>
              </Avatar>
            }             
          />
          <CardActions>
            
            <RaisedButton
              onTouchTap={this.handleTouchTap.bind(this)}
              label="Action"
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose.bind(this)}
            >
              <Menu>
                <MenuItem  primaryText="Add Picture" leftIcon={<FontIcon className="fa fa-picture-o"></FontIcon>} />
                <MenuItem  primaryText="Back to Home" leftIcon={<FontIcon className="fa fa-arrow-circle-left"></FontIcon>} onTouchTap={this.handleHome.bind(this)} />
              </Menu>
            </Popover>    
          </CardActions>
          <Paper zDepth={1} style={{marginTop: 10, marginBottom: 10, width:'100%'}}>
                                 
                  <div style={commonStyle}>
                  <TextField floatingLabelText="*Title" fullWidth={true} value={ (this.state.titleTmp !==' ' ) && this.state.titleTmp || ''} onChange={this.titleChange.bind(this)}/>                  
                
                  <TextField style={{width: '25%'}}  floatingLabelText="*Feature"   value={ (this.state.featureTmp !==' ' ) && this.state.featureTmp || ''} onChange={this.featureChange.bind(this)}/>
                  <TextField style={{width: '25%'}}  floatingLabelText="*Priority"   value={ (this.state.priorityTmp !==' ' ) && this.state.priorityTmp || '' } onChange={this.priorityChange.bind(this)}/>
                  
                  <TextField style={{width: '25%'}}  floatingLabelText="*Owner"   value={ (this.state.ownerTmp !==' ' ) && this.state.ownerTmp || '' } onChange={this.ownerChange.bind(this)}/>                 
                  <TextField style={{width: '25%'}}  floatingLabelText="*Version"   value={ (this.state.versionTmp !==' ' ) && this.state.versionTmp || '' } onChange={this.versionChange.bind(this)}/>
                  
                  <SelectField
                      floatingLabelText="*Bug Status"
                      value={this.state.statusNew}                
                      onChange={this.handleStatusChange.bind(this)}
                    >                                        
                      {mstatus}
                    </SelectField> 
                  <hr/>   
                  </div> 
                  <div style={{width: '60%',margin:'0 auto 0 auto',}}>
                  <HistoryBar historyData={  (!this.state.historyTmp ) && [{historyUser:this.state.user,historyStatus:'New',}] || this.state.historyTmp} loginUser={this.state.user}/>
                  
                  </div>
                  
                  <div style={commonStyle}>
                  <hr/>
                  <label >*Comment:</label><br/>
                  <TextField style={{width: '90%'}} hintText="Please input some detail about this bug" value={ (this.state.commentTmp.length != 0 ) && this.state.commentTmp.toString() || '' }
                  onChange={this.commentChange.bind(this)}  
                  multiLine={true}
                  rows={4}
                  rowsMax={8}/>
                  </div>
                  
                
          </Paper>
          
        <div style={{float:'right'}}> 
          <RaisedButton className="bugAdd_saveBtn" label="Save" onClick={this.handleAddSave.bind(this)} />             
        </div>
        </Card>
	      </MuiThemeProvider>
      </div>
     
    );
  }
}
