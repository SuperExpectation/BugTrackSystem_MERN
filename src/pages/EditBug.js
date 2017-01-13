import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import  BugForm from './BugForm';




export default class EditBug extends Component {
  

  componentWillMount(){    
    this.props.bugCallbacks.loadBugDetailFunc(this.props.params.id)
    this.props.bugCallbacks.loadBugCommentsFunc(this.props.params.id)
    this.setState({      
      title:this.props.bugCallbacks.bugDet.bugDetail.title ,
      commentObj:{},
      comment:'',
      status:this.props.bugCallbacks.bugDet.bugDetail.status,      
      owner:this.props.bugCallbacks.bugDet.bugDetail.owner,
      version:this.props.bugCallbacks.bugDet.bugDetail.version,
      history:[],
      statusArr:this.props.bugCallbacks.statusAll,
      feature:this.props.bugCallbacks.bugDet.bugDetail.feature,
      priority:this.props.bugCallbacks.bugDet.bugDetail.priority,
      user:'Gawen', //session user
    }); 
  }

 
  componentWillReceiveProps(nextProps){    
    if (this.state.statusArr != nextProps.bugCallbacks.bugDet.bugDetail.statusArr ) {
      //console.info("receive title",this.props.bugCallbacks.bugDet.bugDetail.title)
      function removeDup(element) {
        return element !== nextProps.bugCallbacks.bugDet.bugDetail.status
      }

      var filtered = this.props.bugCallbacks.statusAll.filter(removeDup);
      //console.info("statusArr",)
      this.setState({      
        title:nextProps.bugCallbacks.bugDet.bugDetail.title,        
        statusArr:filtered,
        status:nextProps.bugCallbacks.bugDet.bugDetail.status,      
        owner:nextProps.bugCallbacks.bugDet.bugDetail.owner,
        version:nextProps.bugCallbacks.bugDet.bugDetail.version,
        history:nextProps.bugCallbacks.bugDet.bugDetail.history,
        feature:nextProps.bugCallbacks.bugDet.bugDetail.feature,
        priority:nextProps.bugCallbacks.bugDet.bugDetail.priority,
        user:'Gawen', //session user
      }); 
    }

    
  }

  handleFormFieldChange(field, value){
     this.setState({[field]: value}); 
  }

  handleSubmit(bug){     
    this.props.bugCallbacks.updateBugDetailFunc(this.props.params.id, bug)
    browserHistory.push('/');    
  }
  render() {
    //const isEmpty = this.props.bugs.length === 0
    //console.info("isFetching",this.props.bugCallbacks.bugDetail.isFetching)
    const isEmpty = (typeof this.props.bugCallbacks.bugDet == "undefined")

    return (
      <div className="container">        
        <div className="panel-body">          
          {isEmpty
                ? (this.props.bugCallbacks.bugDet.isFetching? 'Loading': 'No data exists')
                : <div>
                  <div className="panel-body">
                    <BugForm drafBug={this.state} commentData={this.props.bugCallbacks.bugComs} handleFormFieldChange={this.handleFormFieldChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
                  </div>
                  </div>      
          }
        </div>
      </div>
    );

  }

}

EditBug.propTypes = {
bugCallbacks: PropTypes.object,
};

