import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Colors from 'material-ui/styles/colors'; 
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';


export default class BugFilter extends React.Component {  
  constructor(props) {
        super(props); 
        this.state = { status: [], 
                       filterValue:"All", 
                       priorityValue:"All", 
                       typeValue:"Title",
                       tab: "single",  
                       searchText:"",   
                       ownerText:"",             
                     };     
  }

  componentWillMount() {
    $.ajax('/api/bugStatus').done(function(data) {
      this.setState({status: data});
    }.bind(this));    
  }

  handleStatusFilter(event, index, value){    
    this.setState({filterValue:value});    
    //this.props.onChange(event.nativeEvent.target.innerText);

  }

  handleTabChange (value) {
    this.setState({
      value: value,
    });
  };


  handlePriorityFilter(event, index, value){
    this.setState({priorityValue:value});  
  }

  handleTypeFilter(event, index, value){
    this.setState({typeValue:value}); 
  }

  handleSearchTextChange(e){
    this.setState({searchText:e.currentTarget.value}); 
  }
  handleOwnerTextChange(e){
    this.setState({ownerText:e.currentTarget.value}); 
  }

  doSearch(){
    this.props.search(this.state.typeValue, this.state.searchText)
  }

  doMulSearch(){
    this.props.mulSearch(this.state.priorityValue,this.state.filterValue, this.state.ownerText)
  }

  doRemoveFilter(){    
    this.setState({searchText:"",
                  filterValue:"All", 
                  priorityValue:"All", 
                  ownerText:"", 
    }); 
    this.props.rmFilter();
  }

  render() {
    var mitems = []; 
    this.state.status.forEach(function(item,index){            
      mitems.push(
        <MenuItem value={item} key={index} primaryText={item} />
      )
    })

    var divStyle = {
      width:'100%',
      
    };

    return (
      <div className="filter-main">        
        <Card initiallyExpanded={true} style={divStyle}>
            <CardHeader title="Filter" subtitle="Show a subset of records"
              actAsExpander={true} showExpandableButton={true}
              avatar={
                <Avatar backgroundColor={'#009688'} icon={<FontIcon className="fa fa-filter"></FontIcon>}>
                </Avatar>                
              }
            />
            <CardText expandable={true} style={{paddingTop: 0}}>
            <Tabs
              value={this.state.value}
              onChange={this.handleTabChange.bind(this)}
            >
              <Tab label="Single Search" value="single" >
                <div>
                  <SelectField
                    floatingLabelText="Type"
                    value={this.state.typeValue}                
                    onChange={this.handleTypeFilter.bind(this)}
                  >
                    <MenuItem value="Title" primaryText="Title" />
                    <MenuItem value="Owner" primaryText="Owner" />                   
                    <MenuItem value="Id" primaryText="Id" />
                  </SelectField>  
                  <div style={{float:'right'}}>     
                    <IconButton iconClassName="fa fa-search" 
                                onClick={this.doSearch.bind(this)}
                    />
                    <IconButton iconClassName="fa fa-times" 
                                onClick={this.doRemoveFilter.bind(this)}
                    />
                  </div>
                  <TextField
                    style={{top:'8px'}}
                    floatingLabelText={this.state.typeValue}                    
                    value={ this.state.searchText}
                    onChange={this.handleSearchTextChange.bind(this)}              
                  />  
                </div>
              </Tab>
              <Tab label="Multiple Search" value="multiple">
                <div>                  
                  <SelectField
                    floatingLabelText="Bug Priority"
                    value={this.state.priorityValue}                                
                    onChange={this.handlePriorityFilter.bind(this)}
                  >
                    <MenuItem value="All" primaryText="All" />
                    <MenuItem value="P1" primaryText="P1" />
                    <MenuItem value="P2" primaryText="P2" />
                    <MenuItem value="P3" primaryText="P3" />
                    <MenuItem value="P4" primaryText="P4" />
                    <MenuItem value="P5" primaryText="P5" />
                  </SelectField> 

                  <SelectField
                    floatingLabelText="Bug Status"
                    value={this.state.filterValue}                
                    onChange={this.handleStatusFilter.bind(this)}
                  >
                    <MenuItem value="All" primaryText="All" />
                    {mitems}
                  </SelectField>  
                  <div style={{float:'right'}}>                         
                    <IconButton iconClassName="fa fa-search" 
                                onClick={this.doMulSearch.bind(this)}
                    />
                    <IconButton iconClassName="fa fa-times" 
                                onClick={this.doRemoveFilter.bind(this)}
                    />

                  </div>
                  <TextField
                    style={{top:'8px'}}
                    floatingLabelText="Owner"
                    value={ this.state.ownerText}
                    onChange={this.handleOwnerTextChange.bind(this)}            
                  />  
                </div>
              </Tab>
            </Tabs>
  

              
              
             
              
              
            </CardText>
          </Card>
          
      </div>
    );
  }
}

