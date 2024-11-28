import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardText, Col, Container, Input, Row, Button } from 'reactstrap';

import { json, Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function ViewUserProfile({user}) {
  return (
        <Container className='mt-5 mb-5'>
     <Link to="/">Home</Link>
     <Row>
     <Col md={{size:12}}>
   <Card>
      <CardBody>
        <CardText>
            <h3 className='text-uppercase' >User Information</h3>
        <Container className='text-center' >
          <img style={{maxWidth:'200px',maxHeight:'200px'}} alt='user profile' src={user.ImageName?user.ImageName :''}></img>
         </Container>
      <h6  style={{color:"red"}} > Welcome user:{user && user.name && user.name }</h6>
      <h6  style={{color:"blue"}} > Email-{user && user.email && user.email }</h6>
      <p><span  style={{color:"Green",fontSize:'18px'}} >About:-</span>{user && user.about && user.about }</p>    
      {user.login?
         <Button onClick={''} color='danger'  className='ms-2' style={{ height: '19px ',width: '76px ',padding: '0px ', fontSize:'11px',color:'Yellow'}}>Update Profile</Button> :''
      }       
   </CardText>
     </CardBody>
     </Card>
     </Col>
     </Row>
    </Container>
  
  )
}

export default ViewUserProfile
