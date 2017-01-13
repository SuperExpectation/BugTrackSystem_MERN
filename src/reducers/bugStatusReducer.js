import * as types from '../constants/ActionTypes'

const bugStatusReducer = (state = {
  isFetching: false,
  bugStatus: [],

},action) =>{
  switch (action.type) {    
    case types.RECEIVE_BugStatus:     
      return Object.assign({}, state, {
        isFetching: false,
        bugStatus: action.bugStatus,        
      })
    default:
      return state
  }
}


export default bugStatusReducer;