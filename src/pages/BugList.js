import React from 'react';
import $ from 'jquery';
import BugFilter from './BugFilter'
import BugTable from './BugTable'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';


export default class BugList extends React.Component {  
  constructor(props) {
        super(props); 
        
  }

  componentWillReceiveProps (){
    this.setState({allbugs: this.props.data});
  }

  componentWillMount (){
    this.setState({allbugs: this.props.data});
  }

  doSearch(type,txt){        
    this.props.search(type, txt);
    //this.state.bugsFilter.slice(this.state.number*pageset,this.state.number*(pageset+1))
    //this.setState({bugs: this.state.bugs.slice(number*pageset,number*(pageset+1))});
  }

  doRemove(){
    this.props.cleanFilter();    
  }

  mulSearch(priority,status,owner){
    this.props.mulSearch(priority,status,owner);
  }
  handleAddBtn() {
    const path = '/bugAdd';
    browserHistory.push(path);
  } 

  render() {
    //console.log("Rendering bug list, num items:", this.state.bugs.length);
    var divStyle = {
      width:'100%',
      
    };
    
    return (
      <div className="main_content" style={divStyle}>                   
        <BugFilter  search={this.doSearch.bind(this)} rmFilter={this.doRemove.bind(this)} mulSearch={this.mulSearch.bind(this)}/>
        
        <BugTable bugs={this.props.data}/>
           
      </div>
    )
  }

  
}

