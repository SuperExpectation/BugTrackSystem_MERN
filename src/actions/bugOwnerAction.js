import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export default function bugOwnerAction() {    
    return (dispatch) => {
      return dispatch(fetchBugOwner())
    };
}

function fetchBugOwner() {
  return dispatch => {
    dispatch(requestGets())
    return fetch(`/api/bugOwner`)  
      .then(response => response.json())    
      .then(json => dispatch(receiveBugOwner(json)))
  }
}


function requestGets() {
  return {
    type: types.REQUEST_GETS,
  }
}

function receiveBugOwner(json) {  
  return {
    type: types.RECEIVE_BugOwner,
    bugOwner: json,
  }
}