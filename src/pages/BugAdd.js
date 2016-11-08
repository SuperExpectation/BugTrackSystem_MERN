import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import BugInputTable from './components/BugInputTable'


 
export default class bugAdd extends React.Component {  
  constructor(props) {
        super(props); 
        this.state = { bugStatus: ['New'],  
                        bug:{submitter:'Gawen'},
                        user:"Gawen",//need get user from session                  
                     };     
  }

  

  

  handleAddSave(bug) {
    var date = Date.now();
    
    console.info("try to save: ");
  	console.info(bug);
    $.ajax({
      type: 'POST', url: '/api/bugAdd', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {        
         const path = '/bug/'+data._id;
    	   browserHistory.push(path);
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });   
  } 
    

  render() {
  	
    return (
      
      <div className="container">  
	      <BugInputTable saveBugInfo={ this.handleAddSave} bugInfo= {this.state.bug} loginUser={this.state.user} bugStatus={this.state.bugStatus}/>
      </div>
     
    );
  }
}
