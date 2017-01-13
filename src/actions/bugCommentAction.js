import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'


function getBugComments(id) {      
  return (dispatch) => {
    return dispatch(fetchBugComments(id))
  };
}

function fetchBugComments(id) {
  return dispatch => {
    dispatch(requestComsGets())
    return fetch(`/api/comment/`+id)  
      .then(response => response.json())    
      .then(json => dispatch(receiveBugComments(json)))
  }
}


function requestComsGets() {
  return {
    type: types.REQUEST_COMMENTSGETS,
  }
}

function receiveBugComments(json) {  
  //console.info(json)
  return {
    type: types.RECEIVE_BUGCOMMENTS,
    comments: json,
  }
}

/*
function submitEdittedBug(id,bug) {   
    console.info("im submitEdittedBug ")   
    return (dispatch) => {
      return dispatch(updateBug(id,bug))
    };
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
          dispatch(getAsyncPartBugs(indexDefault,visiblePagesDefault,JSON.stringify( '{}' )))
          ])
        }else{
          console.info("something is wrong for insert bug post")
        }  
      })        
  }  
}
*/

const bugCommentAction = {
  getBugComments,
}

export default bugCommentAction;