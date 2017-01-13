import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import bugStatusAction from './bugStatusAction';
import bugOwnerAction from './bugOwnerAction';
import bugDetailAction from './bugDetailAction';
import bugCommentAction from './bugCommentAction';


const indexDefault = 0
const visiblePagesDefault = 10

export{
  bugStatusAction,
  bugOwnerAction,
  bugDetailAction,
  bugCommentAction,
}

export function selectPager(index) {
  //console.info("selectPager",index) 
  return {
    type: types.SELECT_PAGER,
    index: index,
  }
}
/*
export function submitNewBug(bug) {   
  console.info("iam submitNewBug",bug) 
    return (dispatch) => {      
      return dispatch(insertBug(bug))
    };
}
*/
export function submitNewBug(bug) {      
    return (dispatch) => {
      return dispatch(insertBug(bug))
    };
}

export function getAsyncBugs() {    
    return (dispatch) => {
      return dispatch(fetchBugs())
    };
}

export function getAsyncPartBugs(index,visiblePages,filter) { 
    //console.info("getAsyncPartBugs") 
    //console.info("getAsyncPartBugs",index,visiblePages)   
    return (dispatch) => {
      return dispatch(fetchPartBugs(index,visiblePages,filter))
    }
}


function fetchPartBugs(index,visiblePages,filter) {
  //console.info("index,visiblePages",index)
  return dispatch => {
    dispatch(requestGets())
    return fetch(`/api/partBugs?index=`+index+`&visiblePages=`+visiblePages+`&filter=`+filter,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
    }) 
    //return fetch(`/api/partBugs?index=`+index+`&visiblePages=`+visiblePages)  
      .then(response => response.json())    
      .then(json => dispatch(receivePartBugs(json)))
  }
}

function fetchBugs() {
  //console.info("iam fetchBugs") 
  return dispatch => {
    dispatch(requestGets())
    return fetch(`/api/bugs`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },})  
      .then(response => response.json())    
      .then(json => dispatch(receivePosts(json)))
  }
}

function insertBug(bug){ 
  //console.info("iam insertBug",bug) 
  return dispatch => {         
    return fetch(`/api/bugAdd`,{
      method: 'POST',      
      body:bug
    }).then(response => {
        if(response.ok){          
          //response.json().then(json => dispatch(receivePostedBug(json))) 
          //dispatch(fetchPartBugs(0,10,JSON.stringify( '{}' )))
          Promise.all([
          dispatch(selectPager(indexDefault)),
          dispatch(fetchPartBugs(indexDefault,visiblePagesDefault,JSON.stringify( '{}' )))
          ])
        }else{
          console.info("something is wrong for insert bug post")
        }  
      })        
  }  
}

/*
function insertBug(bug){ 
  console.info("iam insertBug") 
  return dispatch => { 
    
    return fetch(`/api/bugAdd`,{
      method: 'POST',
      headers: {
        'processData': false,
        'Content-Type': false
      },
      data:bug
    }).then(response => {
        if(response.ok){
          response.json().then(json => dispatch(receivePostedBug(json))) 
        }else{
          throw new Error("Server response wasn't OK")
        }
      })   
      
  }
}
*/
function requestPosts() {
  return {
    type: types.REQUEST_POSTS,
  }
}

function requestGets() {
  return {
    type: types.REQUEST_GETS,
  }
}

function receivePosts(json) {
  //console.info(json)
  return {
    type: types.RECEIVE_POSTS,
    posts: json,
  }
}

function receivePartBugs(json) {
  //console.info(json)
  return {
    type: types.RECEIVE_PARTBUGS,
    bugs: json.bugs,    
    total: json.total,
  }
}

function receivePostedBug(json) {
  //console.info(json)
  return {
    type: types.RECEIVE_POSTEDBUG,
    bug: [json],        
  }
}

