import * as types from '../constants/ActionTypes'


const bugsReducer = (state = {
  isFetching: false,  
  bugs: [],
  total: 0,
  index: 0,
  visiblePages:10,
},action) =>{
  switch (action.type) {
    case types.SELECT_PAGER:
      //console.info("state",state)
      //console.info("action",action.index)
      return Object.assign({}, state, {
        index: parseInt(action.index),            
      })      
    case types.REQUEST_GETS:
      //console.info("isFetching: true")
      return Object.assign({}, state, {
        isFetching: true,
      })   
    case types.RECEIVE_POSTS:
      //console.info("isFetching: false")
      return Object.assign({}, state, {
        isFetching: false,
        bugs: action.posts,        
      })
    case types.RECEIVE_PARTBUGS:
      //console.info("receivePartBugs",state)
      return Object.assign({}, state, {
        isFetching: false,
        bugs: action.bugs,
        total: action.total,        
      })
    case types.RECEIVE_POSTEDBUG:
    //console.info("RECEIVE_POSTEDBUG",action.bug)
    //console.info("RECEIVE_POSTEDBUG",state)
    //console.info("result RECEIVE_POSTEDBUG",Object.assign({}, state, {bugs: action.bug.concat(state.bugs)}))
      
      return Object.assign({}, state, {              
        bugs: state.bugs, 
        total: (state.total + 1),              
      })
    default:
      return state
  }
}


export default bugsReducer;