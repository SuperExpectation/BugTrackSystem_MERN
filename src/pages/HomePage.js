import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import BugList from './BugList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Appbar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Pager from 'react-pager' ;

injectTapEventPlugin();

export default class HomePage extends React.Component {  
  constructor(props) {
        super(props); 
        this.state = { 
                       bugs:[],
                       allbugs:[],                      
                       indexPage: 0, numberPage: 5,page_total:0,                      
                     };     
  }

  handleAddBtn() {
    const path = '/bugAdd';
    browserHistory.push(path);
  }

  componentWillMount (){
    $.ajax('/api/bugs').done(function(data) {
      
      this.setState({allbugs: data,
                     bugs:data,
                     
      })
      
    }.bind(this));
    // In production, we'd also handle errors.
  }

  handlePaginatorChange(pageset) { 
    //console.log("pageset:", pageset);                        
    this.setState({
                  indexPage:pageset
    });   
  }

  doClean(){    
    this.setState({
                  bugs:this.state.allbugs,indexPage: 0, numberPage: 5,page_total:0,
    });  
  }

  doSearch(type,txt){    
    function matchStatus(element) {            
      switch(type){
        case 'Title':
        
        return (element.title.includes(txt));
        //return (element.title == txt);
        case 'Id':
        return (element._id == txt);
        case 'Owner':
        return (element.owner == txt);
        default:
        break;
      }
    }
    var filtered = this.state.allbugs.filter(matchStatus);
    
    this.setState({bugs: filtered,indexPage: 0, numberPage: 5,page_total:0,});
  }

  doMulSearch(priority,status,owner){
    //console.info("priority: "+ priority + ", status: " +status+ ", owner: "+ owner)
    function matchPriority(element) {
      if(priority =="All"){
        return true;
      }
      return (element.priority == priority); 
    }

    function matchStatus(element) {
      if(status =="All"){
        return true;
      }
      return (element.status == status); 
    }

    function matchOwner(element) {
      if(!owner ){
        return true;
      }
      return (element.owner == owner); 
    }
    var filtered = this.state.allbugs.filter(matchPriority);
    filtered = filtered.filter(matchStatus);
    filtered = filtered.filter(matchOwner);
    this.setState({bugs: filtered});
  }

  render() {
    var page_total = Math.ceil(this.state.bugs.length/this.state.numberPage)
    //console.log("page_total:", page_total);
    return (      
      <MuiThemeProvider muiTheme={getMuiTheme({})}>
      <div className="container">
        <Appbar title="Bug Tracker"   showMenuIconButton={false} iconElementRight={<FlatButton label="New Bug" onClick={this.handleAddBtn.bind(this)} />}/>      
        <BugList data={this.state.bugs.slice(this.state.numberPage*this.state.indexPage,this.state.numberPage*(this.state.indexPage+1))} search={this.doSearch.bind(this)} cleanFilter={this.doClean.bind(this)} mulSearch={this.doMulSearch.bind(this)}/>
        <Pager total={page_total}
                       current={this.state.indexPage} 
                       visiblePages={5}                      
                       onPageChanged={this.handlePaginatorChange.bind(this)}/> 
      </div>
      </MuiThemeProvider>
        
      
    );
  }
}


