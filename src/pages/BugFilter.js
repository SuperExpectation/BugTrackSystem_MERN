import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'; 
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Colors from 'material-ui/styles/colors'; 

export default class BugFilter extends React.Component {  
  constructor(props) {
        super(props); 
        this.state = { status: [], 
                       filterValue:"All",                      
                     };     
  }

  componentWillMount() {
    $.ajax('/api/bugStatus').done(function(data) {
      this.setState({status: data});
    }.bind(this));    
  }

  handleFilter(event, index, value){
    this.setState({filterValue:value});    
    this.props.onChange(event.nativeEvent.target.innerText);

  }

  render() {
    var mitems = []; 
    this.state.status.forEach(function(item,index){            
      mitems.push(
        <MenuItem value={index} key={index} primaryText={item} />
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
              <SelectField
                floatingLabelText="Bug Status"
                value={this.state.filterValue}                
                onChange={this.handleFilter.bind(this)}
              >
                <MenuItem value="All" primaryText="All" />
                {mitems}
              </SelectField>            
            </CardText>
          </Card>
          
      </div>
    );
  }
}

