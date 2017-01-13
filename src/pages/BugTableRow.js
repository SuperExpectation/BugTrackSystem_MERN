import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

export default class BugTableRow extends Component {



  render() {   
    return (
        <tbody>
         {this.props.bugData.map((bug, i) =>
          
          <tr key={i}>
            <td><Link to={'/bugEdit/' + bug.id}>{bug.id}</Link></td>
            <td>{bug.status}</td>
            <td>{bug.priority}</td>
            <td>{bug.owner}</td>
            <td>{bug.title}</td>
          </tr>
          )}
        </tbody>
    )
  }
}

BugTableRow.propTypes = {
bugData:PropTypes.arrayOf(PropTypes.object)
};