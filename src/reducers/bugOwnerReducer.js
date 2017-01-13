import * as types from '../constants/ActionTypes'

const bugOwnerReducer = (state = {
  isFetching: false,
  bugOwner: [],

},action) =>{
  switch (action.type) {    
    case types.RECEIVE_BugOwner:     
      return Object.assign({}, state, {
        isFetching: false,
        bugOwner: action.bugOwner,        
      })
    default:
      return state
  }
}


export default bugOwnerReducer;