import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAsyncPartBugs, selectPager, bugStatusAction, bugOwnerAction, submitNewBug, bugDetailAction, bugCommentAction} from '../actions'
import  BugTable from './BugTable';
import  BugFilter from './BugFilter';
import Pager from 'react-pager' ;
import {Panel,Button,Navbar,Nav,NavItem} from 'react-bootstrap/lib/';

class Home extends Component {  
  constructor(props) {
        super(props); 
        this.state = {                                        
                      filter:{},  
                      filterShow:false,                  
                     };     
  }

  componentWillMount() {
    //const { dispatch } = this.props
    //this.props.loadBugs()
    //dispatch(getAsyncBugs())
    this.props.loadBugStatus()
    this.props.loadBugOwner()
    this.props.loadPagerIndex(this.props.index)
    this.props.loadPartBugs(this.props.index,this.props.visiblePages,JSON.stringify(this.state.filter))
    //console.log("Rendering home:", this.props.bugs);
  }

  handlePaginatorChange(pageset) {   
    this.props.loadPagerIndex(pageset)
    this.props.loadPartBugs(pageset,this.props.visiblePages,JSON.stringify(this.state.filter))  
                
  }



  handleApplyBtn(bugId,bugTitle,bugStatus,bugPriority,bugOwner){
    console.info("bugId,bugTitle,bugStatus,bugPriority,bugOwner",bugId,bugTitle,bugStatus,bugPriority,bugOwner)
    var filterTmp = {id:bugId,title:bugTitle,status:bugStatus,priority:bugPriority,owner:bugOwner}
    //console.info(filter)
    this.setState({filter:filterTmp});
    this.props.loadPagerIndex(0)
    this.props.loadPartBugs(this.props.index,this.props.visiblePages,JSON.stringify( filterTmp ))
  }

  handleCleanBtn(){

    this.setState({filter:{}});
    this.props.loadPagerIndex(0)
    this.props.loadPartBugs(this.props.index,this.props.visiblePages,JSON.stringify( '{}' ))
  }

  handleNew(){
    const path = '/bugAdd';
    browserHistory.push({pathname:path })      
  }

  handleFilter(){
    this.setState({filterShow: !this.state.filterShow}); 
  }

  render() {
    const isEmpty = this.props.bugs.length === 0
    const children = this.props.children && React.cloneElement(this.props.children, {
      bugCallbacks:{
        //addBugFunc: this.handleNewBugSubmit.bind(this), 
        addBugFunc:this.props.submitNewBug,
        loadBugCommentsFunc:this.props.loadBugComments,
        loadBugDetailFunc:this.props.loadBugDetail,
        updateBugDetailFunc:this.props.updateBugDetail,
        statusAll: this.props.status.bugStatus,  
        bugDet:this.props.bugDetail,
        bugComs:this.props.bugComments,
      }
    });
    
    return (      

       
      <div className="container">
        <Navbar  collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">BugTracer</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>    
        { this.props.children ? children :
        <div>  
          <div className="row ">  
            <div className="col-xs-1">              
              <Button bsStyle="info" onClick={this.handleNew.bind(this)}>New Bug</Button>
            </div>
            <div className="col-xs-1">
              <Button bsStyle="info" onClick={ this.handleFilter.bind(this)}>Filter</Button>
            </div>
          </div> 
          <Panel collapsible expanded={this.state.filterShow}> 
            <BugFilter  handleAppBtn={this.handleApplyBtn.bind(this)} handleCleanBtn={this.handleCleanBtn.bind(this)} bugStatus={this.props.status.bugStatus} bugOwner={this.props.owner.bugOwner}/>
          </Panel>
          {isEmpty
                ? (this.props.isFetching? 'Loading': 'No data exists')
                : <div>
                  <BugTable bugData={this.props.bugs} />
                  <Pager total={Math.ceil(this.props.total_bugs/this.props.visiblePages) }
                         current={this.props.index}
                         visiblePages={this.props.visiblePages}
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
bugDetail:PropTypes.object,
};

function mapStateToProps(state) {
  //console.info("my state: ",state)
  return {
    bugs: state.bugData.bugs,
    isFetching: state.bugData.isFetching,
    total_bugs: state.bugData.total,
    //index: state.pager,
    visiblePages:state.bugData.visiblePages,
    index: state.bugData.index,
    status: state.bugStatus,
    owner: state.bugOwner,
    bugDetail: state.bugDetail,
    bugComments:state.bugComments,
  }

}


function mapDispatchToProps(dispatch) {  
  return {    
    //loadBugs: () => dispatch(getAsyncBugs()),    
    loadPagerIndex: (index) => dispatch(selectPager(index)),
    loadPartBugs: (index,visiblePages,filter) => dispatch(getAsyncPartBugs(index,visiblePages,filter)),
    loadBugStatus:()=> dispatch(bugStatusAction()),
    loadBugOwner:()=> dispatch(bugOwnerAction()),
    loadBugDetail:(id)=> dispatch(bugDetailAction.getBugDetail(id)),
    loadBugComments:(id) => dispatch(bugCommentAction.getBugComments(id)),
    submitNewBug:(bug)=> dispatch(submitNewBug(bug)), 
    updateBugDetail:(id,bug) => dispatch(bugDetailAction.submitEdittedBug(id,bug)),
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer

