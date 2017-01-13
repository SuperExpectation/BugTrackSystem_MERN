import { combineReducers } from 'redux'
import bugsReducer from './bugsReducer'
import bugStatusReducer from './bugStatusReducer'
import bugOwnerReducer from './bugOwnerReducer'
import bugDetailReducer from './bugDetailReducer'
import bugCommentReducer from './bugCommentReducer'

/*
function getBugs(state = {
  isFetching: false,
  bugs: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        bugs: action.posts,
      })
    default:
      return state
  }
}
*/


const rootReducer = combineReducers({
  bugDetail:bugDetailReducer,
  bugComments:bugCommentReducer,
  bugData:bugsReducer,
  bugStatus:bugStatusReducer,
  bugOwner:bugOwnerReducer,
})

export default rootReducer
