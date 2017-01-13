import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import  BugForm from './BugForm';
import { connect } from 'react-redux'
import { submitNewBug, bugStatusAction } from '../actions'

class AddBug extends Component {
  componentWillMount(){
    this.setState({      
      title:'',
      comment:'',
      status:['New'],
      owner:'',
      version:'',
      feature:'',
      priority:'P5',
      user:'Gawen', //session user
    });
    
  }

  handleFormFieldChange(field, value){
     this.setState({[field]: value}); 
  }

  handleSubmit(bug){
    console.info(bug)    
    this.props.submitNewBug(bug);    
    //browserHistory.push('/');
  }
  render() {
    
    return (
      <div className="container">        
        <div className="panel-body">
          <BugForm drafBug={this.state}  handleFormFieldChange={this.handleFormFieldChange.bind(this)} handleSubmitNewBug={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    );

  }

}

AddBug.propTypes = {

};

function mapStateToProps(state) {
  //console.info("my state: ",state)
  return {
    
  }

}


function mapDispatchToProps(dispatch) {  
  return {        
    submitNewBug:(bug)=> dispatch(submitNewBug(bug)),    
  }
}

const Newbug = connect(mapStateToProps,mapDispatchToProps)(AddBug)

export default Newbug