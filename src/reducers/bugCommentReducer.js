import * as types from '../constants/ActionTypes'

const bugCommentReducer = (state = {	  
	  bugComments: [],
    isComsFetching: false,
	} ,action) =>{
  switch (action.type) {
    case types.REQUEST_COMMENTSGETS:
      //console.info("isFetching: true")
      return Object.assign({}, state, {
        isComsFetching: true,
      }) 
    case types.RECEIVE_BUGCOMMENTS:
      //console.info("im RECEIVE_BUGCOMMENTS")
      //console.info("action",action)
      //console.info("detail",action.detail)
      return  Object.assign({}, state, {
		        isComsFetching: false,
		        bugComments:action.comments,      
		      })
    default:      
      return state
  }
}

export default bugCommentReducer;