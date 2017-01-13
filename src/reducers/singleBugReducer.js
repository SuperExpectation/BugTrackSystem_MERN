import * as types from '../constants/ActionTypes'

const bugDetailReducer = (state = 0 ,action) =>{
  switch (action.type) {
    case types.RECEIVE_BUGDETAIL:
      //console.info("state",state)
      //console.info("action",action.index)
      return  parseInt(action.index)
    default:      
      return state
  }
}



export default bugDetailReducer;