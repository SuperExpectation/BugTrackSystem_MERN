import React from 'react';
import $ from 'jquery';
import BugFilter from './BugFilter'
import BugTable from './BugTable'
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Pager from 'react-pager' ;

export default class BugList extends React.Component {  
  constructor(props) {
        super(props); 
        this.state = { bugs: [],
                       allbugs:[],
                       indexPage: 0, numberPage: 5,                      
                     };     
  }

  componentWillMount (){
    $.ajax('/api/bugs').done(function(data) {
      this.setState({bugs: data});
      this.setState({allbugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
  }

  doFilter(filterValue) {
    console.info("BugList: "+filterValue);
    if(filterValue =='All'){
      this.setState({bugs: this.state.allbugs});
      return;
    }
    function matchStatus(element, index, array) {
      return (element.status == filterValue);
    }
    var filtered = this.state.allbugs.filter(matchStatus);
    this.setState({bugs: filtered});
  }

  doPager(pageset,number){    
    //this.state.bugsFilter.slice(this.state.number*pageset,this.state.number*(pageset+1))
    //this.setState({bugs: this.state.bugs.slice(number*pageset,number*(pageset+1))});
  }

  handlePaginatorChange(pageset) {                     
    
    //this.setState({bugsFilter: this.state.bugsFilter.slice(this.state.number*pageset,this.state.number*(pageset+1))});   
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
        <BugFilter onChange={this.doFilter.bind(this)} />
        
        <BugTable bugs={this.state.bugs}/>
            
      </div>
    )
  }

  
}

