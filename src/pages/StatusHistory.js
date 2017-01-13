import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import  BugForm from './BugForm';
import {ProgressBar,Panel} from 'react-bootstrap/lib/';



export default class StatusHistory extends Component {
  
  render() {
    //const isEmpty = this.props.bugs.length === 0
    //console.info("isFetching",this.props.bugCallbacks.bugDetail.isFetching)
    function getColor(string){
      switch (string) {
        case "New":          
          return "info";
        case "Active":
          return "danger";
        case "Closed":
          return "warning";
        case "Need Merge":
          return "info";
        case "Verified":
          return "success";  
        case "Resolved":
          return "info";  
        default:      
          return "info"
      }
    }


    return (
        <div>
          <Panel header={"Status changing Stack"} bsStyle="info">      
            <ProgressBar>
              {this.props.historyData.map((history, i) =>                                   
                <ProgressBar active bsStyle={getColor(history.historyStatus)} now={(100/this.props.historyData.length)>25?25:(100/this.props.historyData.length)} key={i} label={history.historyStatus +' : '+history.historyUser}/>         
              )}
            </ProgressBar>

          </Panel>
        </div>
    );

  }

}

StatusHistory.propTypes = {

};

