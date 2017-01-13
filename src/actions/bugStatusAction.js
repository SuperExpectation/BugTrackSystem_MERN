import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export default function bugStatusAction() {    
    return (dispatch) => {
      return dispatch(fetchBugStatus())
    };
}

function fetchBugStatus() {
  return dispatch => {
    dispatch(requestGets())
    return fetch(`/api/bugStatusAll`)  
      .then(response => response.json())    
      .then(json => dispatch(receiveBugStatus(json)))
  }
}


function requestGets() {
  return {
    type: types.REQUEST_GETS,
  }
}

function receiveBugStatus(json) {  
  return {
    type: types.RECEIVE_BugStatus,
    bugStatus: json,
  }
}