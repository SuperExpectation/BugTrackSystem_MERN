import * as types from '../constants/ActionTypes'

const bugDetailReducer = (state = {	  
	  bugDetail: {
      title:'',
      comment:'', //session user
      status:'',
      statusArr:[],
      owner:'',
      version:'',
      history:[],
      feature:'',
      priority:'P5',
      user:'Gawen', //session user
    },
	} ,action) =>{
  switch (action.type) {
    case types.RECEIVE_BUGDETAIL:
      //console.info("im RECEIVE_BUGDETAIL")
      //console.info("action",action)
      //console.info("detail",action.detail)
      return  Object.assign({}, state, {
		        isFetching: false,
		        bugDetail:action.detail,      
		      })
    default:      
      return state
  }
}

export default bugDetailReducer;