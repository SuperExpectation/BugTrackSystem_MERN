import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import  BugForm from './BugForm';


export default class Newbug extends Component {
  componentWillMount(){
    //console.info(xx.splice(1,xx.length-1))
    this.setState({      
      title:'',
      comment:'', //session user
      status:'New',
      statusArr:[],
      owner:'',
      version:'',
      history:[],
      commentObj:{},
      feature:'',
      priority:'P5',
      user:'Gawen', //session user
    });    
  }

  handleFormFieldChange(field, value){
     //console.info("field, value",field, value)
     this.setState({[field]: value}); 
     //console.info(this.state.comment)
  }

  handleSubmit(bug){
    //console.info(bug)    
    console.info("new handleSubmit");
    this.props.bugCallbacks.addBugFunc(bug);     
    browserHistory.push('/'); 
    
  }
  render() {    
    return (
      <div className="container">        
        <div className="panel-body">
          <BugForm drafBug={this.state} commentData={{ }} handleFormFieldChange={this.handleFormFieldChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    );
  }

}

Newbug.propTypes = {
bugCallbacks: PropTypes.object,
};
