import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAsyncBugs, getAsyncPartBugs, selectPager, bugStatusAction, bugOwnerAction } from '../actions'
import  BugTable from './BugTable';
import  BugFilter from './BugFilter';
import Pager from 'react-pager' ;



class Home extends Component {  
  constructor(props) {
        super(props); 
        this.state = {                  
                      visiblePages: 10, 
                      filter:{},                    
                     };     
  }

  componentWillMount() {
    //const { dispatch } = this.props
    //this.props.loadBugs()
    //dispatch(getAsyncBugs())
    this.props.loadBugStatus()
    this.props.loadBugOwner()
    this.props.loadPagerIndex(this.props.index)
    this.props.loadPartBugs(this.props.index,this.state.visiblePages,JSON.stringify(this.state.filter))
    //console.log("Rendering home:", this.props.bugs);
  }



  handlePaginatorChange(pageset) {
    //console.log('now pageset', pageset);
    this.props.loadPagerIndex(pageset)
    this.props.loadPartBugs(pageset,this.state.visiblePages,JSON.stringify(this.state.filter))  
                
  }

  handleApplyBtn(bugId,bugTitle,bugStatus,bugPriority,bugOwner){
    console.info("bugId,bugTitle,bugStatus,bugPriority,bugOwner",bugId,bugTitle,bugStatus,bugPriority,bugOwner)
    var filterTmp = {id:bugId,title:bugTitle,status:bugStatus,priority:bugPriority,owner:bugOwner}
    //console.info(filter)
    this.setState({filter:filterTmp});
    this.props.loadPagerIndex(0)
    this.props.loadPartBugs(this.props.index,this.state.visiblePages,JSON.stringify( filterTmp ))
  }

  handleCleanBtn(){

    this.setState({filter:{}});
    this.props.loadPagerIndex(0)
    this.props.loadPartBugs(this.props.index,this.state.visiblePages,JSON.stringify( '{}' ))
  }

  handleNew(){
    const path = '/bugAdd';
    browserHistory.push({pathname:path })      
  }

  render() {
    const isEmpty = this.props.bugs.length === 0
    
    
    return (            
      <div className="container">
        <div className="row ">  
          <h1>BugTracer</h1>
        </div>  
        { this.props.children ? this.props.children :
        <div>  
          <div className="row ">  
            <div className="col-xs-1">
              <input  type="button" value="New Bug"  onClick = {this.handleNew.bind(this)} />
            </div>
          </div>  
          <BugFilter handleAppBtn={this.handleApplyBtn.bind(this)} handleCleanBtn={this.handleCleanBtn.bind(this)} bugStatus={this.props.status.bugStatus} bugOwner={this.props.owner.bugOwner}/>
          {isEmpty
                ? (this.props.isFetching? 'Loading': 'Not data exists')
                : <div>
                  <BugTable bugData={this.props.bugs} />
                  <Pager total={this.props.total_page}
                         current={this.props.index}
                         visiblePages={this.state.visiblePages}
                         onPageChanged={this.handlePaginatorChange.bind(this)}/>    
                  </div>      
          }
        </div>  
        }
        
      </div>
    );
  }
}


Home.propTypes = {
bugs:PropTypes.arrayOf(PropTypes.object),
loadPagerIndex:PropTypes.func.isRequired,
loadPartBugs:PropTypes.func.isRequired,
loadBugStatus:PropTypes.func.isRequired,
status:PropTypes.object.isRequired,
owner:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  //console.info("my state: ",state)
  return {
    bugs: state.bugData.bugs,
    isFetching: state.bugData.isFetching,
    total_page: state.bugData.total,
    index: state.pager,
    status: state.bugStatus,
    owner: state.bugOwner,
  }

}


function mapDispatchToProps(dispatch) {  
  return {    
    //loadBugs: () => dispatch(getAsyncBugs()),    
    loadPagerIndex: (index) => dispatch(selectPager(index)),
    loadPartBugs: (index,visiblePages,filter) => dispatch(getAsyncPartBugs(index,visiblePages,filter)),
    loadBugStatus:()=> dispatch(bugStatusAction()),
    loadBugOwner:()=> dispatch(bugOwnerAction()),
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer

