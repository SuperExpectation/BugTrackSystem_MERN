import * as types from '../constants/ActionTypes'

const pagerReducer = (state = 0 ,action) =>{
  switch (action.type) {
    case types.SELECT_PAGER:
      //console.info("state",state)
      //console.info("action",action.index)
      return  parseInt(action.index)
    default:      
      return state
  }
}



export default pagerReducer;