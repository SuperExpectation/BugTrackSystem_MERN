import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import {FormControl,FormGroup,ControlLabel,Panel} from 'react-bootstrap/lib/';
import ImageList from './ImageList';
import BugComment from './BugComment';
import StatusHistory from './StatusHistory';

export default class BugForm extends Component {
  constructor(props) {
        super(props); 
        this.state = {                  
                      show: false, 
                      desvalue:'',
                      tmpImageArr:[],
                      newImageDecArr:[],
                      newImageArr:[],
                      maxImageFlag:false,
                      
                     };     
  }

  handleChange(field, e){
 	this.props.handleFormFieldChange(field, e.target.value);
  }

  handleHomeBtn(){
  	const path = '/';
    browserHistory.push(path);
  }

  handleSubmitBtn(){  

  	if(this.props.drafBug.title && this.props.drafBug.feature && this.props.drafBug.priority  && this.props.drafBug.status && this.props.drafBug.owner && this.props.drafBug.version && this.props.drafBug.comment){ 
  		var formData = new FormData();
  		var commentObj = {user:this.props.drafBug.user,text:this.props.drafBug.comment}
	  	if((this.props.drafBug.history.length == 0) || (this.props.drafBug.history[this.props.drafBug.history.length-1].historyStatus !== this.props.drafBug.status)){
	  		console.info("history status has changed")
	  		var historyArr = this.props.drafBug.history.concat({historyUser:this.props.drafBug.user, historyStatus:this.props.drafBug.status})
	  		formData.append('history', JSON.stringify(historyArr));
	  	}else{
	  		console.info("history still the same")
	  		formData.append('history', JSON.stringify(this.props.drafBug.history));
	  	}
	  	
	  	//Object.assign({}, this.props.drafBug.history, {historyUser:this.props.drafBug.user, historyStatus:this.props.drafBug.status})
	  	//console.info(historyArr)  	
	  	
		for (var i = 0; i < this.state.newImageArr.length; i++) {
		    var file = this.state.newImageArr[i];

		    // add the files to formData object for the data payload
		    formData.append('uploads[]', file, file.name);
		} 
		 

		formData.append('title', this.props.drafBug.title);
		formData.append('feature', this.props.drafBug.feature);
		formData.append('priority', this.props.drafBug.priority);
		formData.append('status', this.props.drafBug.status);
		formData.append('owner', this.props.drafBug.owner);
		formData.append('submitter', this.props.drafBug.user);
		formData.append('version', this.props.drafBug.version);
		formData.append('comment', JSON.stringify(commentObj));
		
		formData.append('descirption', JSON.stringify(this.state.newImageDecArr));
		formData.append('date', Date.now());
		
		this.props.handleSubmit(formData)
		this.state = {                  
	                      show: false, 
	                      desvalue:'',
	                      tmpImageArr:[],
	                      newImageDecArr:[],
	                      newImageArr:[],
	                      maxImageFlag:false,
	                     };  
  	}else{
  		console.info("Error, Item with '*' must be filled!")
      	alert("Error, Item with '*' must be filled!");
  	}
  }

  	

  handleAddPic(e){ 
    e.preventDefault();     
    var file = e.target.files[e.target.files.length-1];  
    //console.info("file",file)
    //console.info("file length",e.target.files.length);    

    if ( file ) {
      var extension=new String (file.type.substring(file.type.lastIndexOf("/")+1,file.type.length));
      //console.info("ext: "+ extension)
      if(extension=="jpg"||extension=="gif"||extension=="jpeg"||extension=="bmp"||extension=="png"){
        //console.info("yes")
        this.setState({ oriFile:file,
        				validateFile:'success',
                        //newImageArr: this.state.newImageArr.concat(file)
                      }); 
      }else{
        //console.info("Error, Only image files are allowed."+ file.type)
        alert("Error, Only image files are allowed.");  
        this.handleCloseBtn()
      }
    }
  }

  handleDesChange(e){
  	this.setState({ desvalue: e.target.value });
  }

  handleCloseBtn(){
  	this.setState({ show: false,desvalue:''})
  }
   
  handleOKBtn(){
  	var reader = new FileReader();
    function isEmpty(obj){
        for (var name in obj)
        {
            return false;
        }
        return true;
    };

    if(!isEmpty(this.state.oriFile) ){         
      this.setState({                               
          newImageDecArr:this.state.desvalue ? this.state.newImageDecArr.concat(this.state.desvalue): this.state.newImageDecArr.concat(""), 
          newImageArr: this.state.newImageArr.concat(this.state.oriFile),         
        }); 

      reader.onloadend = () => {                    
        this.setState({                               
          show: false,          
          loading: false, 
          desvalue:'',
          tmpImageArr: this.state.tmpImageArr.concat({tmpImage:reader.result,description:this.state.desvalue}),          
        }); 
        //this.props.addImage(this.state.newImageArr,this.state.newImageDecArr)
      };    

      reader.onloadstart = () => {                    
        this.setState({                     
          loading: true, 
          maxImageFlag:  (this.state.newImageArr.length >=6) ? true : false, 
        }); 
        
      };
      reader.readAsDataURL( this.state.oriFile );            
    }
  }

  render() {

    const isEmpty = (typeof this.props.commentData.bugComments == "undefined")
    
    return (
      <form role="form">
		  <div className="form-group">
		  	{
		  		this.props.drafBug.history.length>0?<div className="row ">
			    									<StatusHistory historyData={this.props.drafBug.history}/>
			    									</div>
			    : ''
		  	}
		  	

		    <div className="row ">
			    <Panel header={"Bug Detail Information"} bsStyle="info"> 
				  	<div className="row ">		    			    
				    	<div className="col-xs-1">
				    		<div className="modal-container" >
						        <Button		
						          bsStyle="info"		          				          
						          disabled={this.state.maxImageFlag}
						          onClick={() => this.setState({ show: true})}
						        >
						          Image
						        </Button>

						        <Modal
						          show={this.state.show}
						          onHide={this.handleCloseBtn.bind(this)}
						          container={this}
						          aria-labelledby="contained-modal-title"
						        >
						          <Modal.Header closeButton>
						            <Modal.Title id="contained-modal-title">Add image</Modal.Title>
						          </Modal.Header>
						          <Modal.Body>
						            <form>
							        <FormGroup
							          controlId="formBasicText"					          
							        >
							        <ControlLabel>{"Description"}</ControlLabel>
						            
						            <FormControl
							            type="text"
							            value={this.state.desvalue}
							            placeholder="Enter description"
							            onChange={ this.handleDesChange.bind(this)}
							         />
							         
							         <ControlLabel>{"File"}</ControlLabel>
							         
							         <FormControl
							            type="file"
							            ref="uploadFile"								            				           
							            onChange={ this.handleAddPic.bind(this)}
							         />
							         
							         <hr/>
							         <h6>PS: Support 6 Images Max</h6>
							         </FormGroup>
		      						</form>
						          </Modal.Body>
						          <Modal.Footer>
						            <Button onClick={this.handleCloseBtn.bind(this)}>Close</Button>
						            <Button onClick={this.handleOKBtn.bind(this)}>OK</Button>

						          </Modal.Footer>
						        </Modal>
						    </div>
				    	</div>		    	  	
				    </div>	

				    <div className="row">		    
					    <div className="col-sm-6">
					      <label>*Title</label>
					      <input type="text" className="form-control" value={this.props.drafBug.title} 
						      onChange={this.handleChange.bind(this,'title')} 
						      placeholder="Title" required={true} autoFocus={true} />
					    </div>
					    <div className="col-sm-6">					      	
					      <label>*Feature</label>
					      <input  type="text" className="form-control"  value={this.props.drafBug.feature}
					      	  onChange={this.handleChange.bind(this,'feature')}
					       	  placeholder="Feature" required={true} />					     
					    </div>
				    </div>
				    <div className="row">		    
					    <div className="col-sm-6">
					      <label>*Owner</label>
					      <input type="text" className="form-control" value={this.props.drafBug.owner}
					      	  onChange={this.handleChange.bind(this,'owner')}
					      	  placeholder="Owner" required={true} />
					    </div>
					    <div className="col-sm-6">
					      <label>*Version</label>
					      <input type="text" className="form-control" value={this.props.drafBug.version}
					      	  onChange={this.handleChange.bind(this,'version')}
					      	  placeholder="Version" required={true} />
					    </div>
				    </div>
				    
				    <div className="row ">
					    <div className="col-xs-6">	
					    	<label htmlFor="Status">*Status</label>
						    <select className="form-control" 
						    value={this.props.drafBug.status}
				 			onChange={this.handleChange.bind(this,'status')}>	
				 			  <option value={this.props.drafBug.status}>{this.props.drafBug.status}</option> 	      
						      {this.props.drafBug.statusArr.map((status, i) =>      	          
					            <option key={i} value={status} >{status}</option>	          
						        )}
						    </select>
					    </div>
					    <div className="col-xs-6">
						    <label htmlFor="Priority">*Priority</label>
						    <select id="priority" className="form-control" value={this.props.drafBug.priority}
				 			onChange={this.handleChange.bind(this,'priority')}>		      
						      <option value="P1">P1</option>
						      <option value="P2">P2</option>
						      <option value="P3">P3</option>
						      <option value="P4">P4</option>
						      <option value="P5">P5</option>
						    </select>
					    </div>	
				    </div>
				    <div className="row ">	
				    	<div className="col-sm-12"> 
						    <label htmlFor="Comment">*Comment</label>
				    		<textarea className="form-control" value={this.props.drafBug.comment}
							 onChange={this.handleChange.bind(this,'comment')}
							 placeholder="Comment"
							 required={true} rows="8"></textarea>	
						 </div>
					</div>
				    <div className="row ">	
				    	<ImageList dataArr={this.state.tmpImageArr}/>
				    </div>
				    
				    <br/>		    
			    </Panel>
		    </div>
		    <div className="row ">
		    	
		    	{isEmpty
                ? (this.props.commentData.isComsFetching? 'Loading': '')
                : <BugComment comData={this.props.commentData.bugComments}  />  
          		}
		    </div>
		    <hr/>
		    <div className="row ">		    			    
		    	<div className="col-xs-1">		    		
		    		<Button bsStyle="info"  onClick={this.handleHomeBtn.bind(this)}>Home</Button>				            
		    	</div>
		    	<div className="col-xs-1">		    		
		    		<Button bsStyle="primary" onClick={this.handleSubmitBtn.bind(this)}>Submit</Button>
		    	</div>		    	
		    </div>	    
		  </div>
		</form>
    );
  }
}

BugForm.propTypes = {
handleFormFieldChange: PropTypes.func.isRequired,
handleSubmit: PropTypes.func.isRequired,
drafBug: PropTypes.shape({
 title: PropTypes.string,
 comment: PropTypes.string,
 history:PropTypes.array,
 statusArr: PropTypes.array,
 status: PropTypes.string,
 version: PropTypes.string,
 priority: PropTypes.string,
 owner: PropTypes.string,
 feature: PropTypes.string,
 }).isRequired,
};