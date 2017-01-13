import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class BugFilterForm extends Component {
  doSearch(){
  	//console.info("bugId,bugTitle,bugStatus,bugPriority,bugOwner",this.refs.bugId.value,this.refs.bugTitle.value,this.refs.bugStatus.value,this.refs.bugPriority.value,this.refs.bugOwner.value)
    console.info(typeof(this.refs.bugId.value))
    console.info(typeof(Number(this.refs.bugId.value)))
    console.info(Number(this.refs.bugId.value))
    if( Number(this.refs.bugId.value) < 0 || isNaN(Number(this.refs.bugId.value) )  ){
    	alert("field Id only support type of number");
    	 
    	return ;
    }else{
    	this.props.handleAppBtn(this.refs.bugId.value,this.refs.bugTitle.value,this.refs.bugStatus.value,this.refs.bugPriority.value,this.refs.bugOwner.value)
    }
    
    /*
    this.refs.bugId.value = ""
    this.refs.bugTitle.value = ""
    this.refs.bugStatus.value = "All"
    this.refs.bugPriority.value = "All"
    this.refs.bugOwner.value = "All"
    */
  }

  CleanSearch(){
  	this.props.handleCleanBtn()
  	this.refs.bugId.value = ""
    this.refs.bugTitle.value = ""
    this.refs.bugStatus.value = "All"
    this.refs.bugPriority.value = "All"
    this.refs.bugOwner.value = "All"
  }

  render() {
    
    return (
        <form role="form">
		  <div className="form-group">

		    <div className="row">
		    <div className="col-sm-6">
		      <label htmlFor="firstname" >BugId</label>
		      <input type="text" className="form-control" id="firstname" placeholder="Input BugId" ref="bugId"/>
		    </div>
			
		    <div className="col-sm-6">
		      <label htmlFor="firstname" >Bug Title</label>
		      <input type="text" className="form-control" id="firstname" placeholder="Input Title" ref="bugTitle"/>
		    </div>
		    </div>
		    <label htmlFor="name">Status</label>
		    <select className="form-control" ref="bugStatus" >
		      <option>All</option>
		      {this.props.bugStatus.map((status, i) =>      
	          
	            <option key={i}>{status}</option>	          
		        )}
		    </select>
		    <label htmlFor="name">Priority</label>
		    <select className="form-control" ref="bugPriority">
		      <option>All</option>
		      <option>P1</option>
		      <option>P2</option>
		      <option>P3</option>
		      <option>P4</option>
		      <option>P5</option>
		    </select>	
		    <label htmlFor="name">Owner</label>  
		    <select className="form-control" ref="bugOwner">
		      <option>All</option>
		      {this.props.bugOwner.map((owner, i) =>      
	          
	            <option key={i}>{owner}</option>	          
		        )}
		    </select>	
		    <div className="row ">		    	
		    	<div className="col-xs-1">		    	
		    	<Button bsStyle="info" onClick={this.CleanSearch.bind(this)} >Clean</Button>
		    	</div>
		    	<div className="col-xs-1">		    	
		    	<Button bsStyle="info" onClick={this.doSearch.bind(this)} >Apply</Button>
		    	</div>
		    	
		    </div>	    
		  </div>
		</form>
    );

  }

}

BugFilterForm.propTypes = {
handleAppBtn:PropTypes.func.isRequired,
handleCleanBtn:PropTypes.func.isRequired,
bugStatus:PropTypes.array.isRequired,
bugOwner:PropTypes.array.isRequired,
};




