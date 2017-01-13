import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import  BugFilterForm from './BugFilterForm';


export default class BugFilter extends Component {  
  render() {
    
    return (
      <div>
          <BugFilterForm handleAppBtn={this.props.handleAppBtn} handleCleanBtn={this.props.handleCleanBtn} bugStatus={this.props.bugStatus} bugOwner={this.props.bugOwner}/>        
      </div>

      
    );

  }

}

BugFilter.propTypes = {
handleAppBtn:PropTypes.func.isRequired,
handleCleanBtn:PropTypes.func.isRequired,
bugStatus:PropTypes.array.isRequired,
bugOwner:PropTypes.array.isRequired,
};