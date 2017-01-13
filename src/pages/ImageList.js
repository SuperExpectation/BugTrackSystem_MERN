import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import {Grid,Row,Col,Thumbnail, Image} from 'react-bootstrap/lib/';

export default class ImageList extends Component {
  

  render() {    
    return (
      <Grid>
        <Row>
        {this.props.dataArr.map((image, i) =>      
              <Col xs={3} md={2} key={i}> 


                <Image  src={(!image.commentId ) &&  image.tmpImage || require("../../public/upload/" +image.filename )} thumbnail/>                
                  
                <p>{image.description}</p>                            
              </Col>
                      
            )}
        </Row>
      </Grid>
    );

  }

}

ImageList.propTypes = {
dataArr: PropTypes.arrayOf(PropTypes.object),
};