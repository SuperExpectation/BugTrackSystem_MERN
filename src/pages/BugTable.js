import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import BugTableRow from './BugTableRow';
import {Table} from 'react-bootstrap/lib/';


export default class BugTable extends Component {



  render() {
    
    return (
      <div>
        
        <Table striped bordered condensed hover>
          
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Owner</th>
              <th>Title</th>
            </tr>
          </thead>
          
            <BugTableRow bugData={this.props.bugData} />
          
        </Table>
      </div>
    );

  }

}

BugTable.propTypes = {
bugData:PropTypes.arrayOf(PropTypes.object)
};