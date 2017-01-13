import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import  BugForm from './BugForm';
import  ImageList from './ImageList';
import Panel from 'react-bootstrap/lib/Panel';

export default class BugComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  handleClick(){
    this.setState({show: !this.state.show}); 
  }


  render() {    
    return (
      <div>        
          <Panel header={"Previous Comment Stack"} bsStyle="info" collapsible expanded={this.state.show} onClick={this.handleClick.bind(this) }>
            {this.props.comData.map((comm, i) =>                                  
              <div key={i}>
                <label htmlFor="User">User: {comm.user}</label>
                <br/>
                <label htmlFor="TimeStamp">Date: {comm.timestamp}</label>
                <textarea className="form-control" value={comm.text}           
                 disabled={true} rows="8"></textarea>
                 {comm.imageInclude 
                  ?                
                    <div>                        
                      <ImageList dataArr={comm.image}/>
                    </div>      
                    
                  : <div/>
                 }                 
              </div>         
            )}
          </Panel>
      </div>
    );
  }

}

BugComment.propTypes = {
comData:PropTypes.arrayOf(PropTypes.object),
};
