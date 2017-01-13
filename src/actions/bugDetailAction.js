import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { getAsyncPartBugs, selectPager, } from './'
import bugCommentAction from './bugCommentAction'

const indexDefault = 0
const visiblePagesDefault = 10

function getBugDetail(id) {    
  //console.info("im bugDetailAction")
  return (dispatch) => {
    return dispatch(fetchBugDetail(id))
  };
}

function submitEdittedBug(id,bug) {   
    console.info("im submitEdittedBug ")   
    return (dispatch) => {
      return dispatch(updateBug(id,bug))
    };
}

function fetchBugDetail(id) {
  return dispatch => {
    dispatch(requestGets())
    return fetch(`/api/bug/`+id)  
      .then(response => response.json())    
      .then(json => dispatch(receiveBugDetail(json)))
  }
}


function requestGets() {
  return {
    type: types.REQUEST_GETS,
  }
}

function receiveBugDetail(json) {  
  //console.info(json)
  return {
    type: types.RECEIVE_BUGDETAIL,
    detail: json,
  }
}

function updateBug(id,bug){ 
  //console.info("iam updateBug",bug) 
  return dispatch => {         
    return fetch(`/api/bugs/`+ id,{
      method: 'POST',      
      body:bug
    }).then(response => {
        if(response.ok){          
          //response.json().then(json => dispatch(receivePostedBug(json))) 
          //dispatch(fetchPartBugs(0,10,JSON.stringify( '{}' )))
          Promise.all([
          dispatch(selectPager(indexDefault)),
          dispatch(getAsyncPartBugs(indexDefault,visiblePagesDefault,JSON.stringify( '{}' ))),          
          ])          
        }else{
          console.info("something is wrong for insert bug post")
        }  
      })        
  }  
}


const bugDetailAction = {
  getBugDetail,
  submitEdittedBug,
}
export default bugDetailAction;