import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base'
import { json, Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import userContext from '../../context/userContext';
import { loadUserDetailsById } from '../../services/user-service';
import ViewUserProfile from '../../components/ViewUserProfile';

function Profileinfo() {
  const {Id}=useParams();
// const object=useContext(userContext);
   const[user,setUser]=useState({
Id:'',
name:'',
email:'',
about:'',
ImageName:'',
ImageUrl:''
   });


    // Loading Details...
  useEffect(() => {
    loadUserDetailsById(Id)
      .then((data) => {
        console.log('Datas:', data);
        setUser(data);
        console.log('userwa',user);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in Loading Comments');
      });
  }, [Id]);

  const userView=()=>{
    return(
      <div>
          <ViewUserProfile user={user}/>
      </div>
    )
  
  }

  return (
    <Base>
       { user ? userView:'Loading user Data...'}
    </Base>
  )
}

export default Profileinfo
