import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import { json, Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import userContext from '../../context/userContext';
import { loadUserDetailsById } from '../../services/user-service';
function Profileinfo() {
  const {Id}=useParams();
// const object=useContext(userContext);
   const[user,setUser]=useState(null);


    // Loading Details...
  useEffect(() => {
    loadUserDetailsById(Id)
      .then((data) => {
        console.log('Datas:', data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in Loading Comments');
      });
  }, []);



  return (
    <Base>
      <Container className='mt-5 mb-5'>
     <Link to="/">Home</Link>
<Row>
  <Col md={
    {
      size:12
    }
  }
>
   <Card>
      <CardBody>
 <CardText>
<h6  style={{color:"red"}} >

          Welcome user:{user && user.name && user.name }
          </h6>
          <h6  style={{color:"blue"}} >
          Email-{user && user.email && user.email }
          </h6>
        <p>
         <span  style={{color:"Green",fontSize:'18px'}} >About:-</span>{user && user.about && user.about } 
        </p>
         
   </CardText>
      </CardBody>

     </Card>
</Col>
</Row>
</Container>
  
    </Base>
  )
}

export default Profileinfo
