import React, { useEffect, useState } from 'react'
import userContext from './userContext'
import { CurrentUser, isLoggedIn } from '../auth';
function UserProvider({children}) {


  const[user,setUser]=useState({
    data:{},
    login:false
  });

  useEffect(()=>{
  setUser({
    data:CurrentUser(),
    login:isLoggedIn()
  });
  
  },[])
  // useEffect(()=>{
  //   setUser({
  //     name:'Bhujveer Singh'
  //   })
  // },[]); //it will called on mounting phase only

  return (
   <userContext.Provider value={{user,setUser}}>
    {children}
   </userContext.Provider>
  )
}

export default UserProvider


//if i want to get filled values from localstorage direclty after using UserProvider then we can use given type of code:-

// import React, { useEffect, useState } from 'react';
// import userContext from './userContext';

// function UserProvider({ children }) {
//   const [user, setUser] = useState({
//     data: {},
//     login: false,
//   });

//   // This effect runs only once when the component mounts
//   useEffect(() => {
//     // Check if there is any user data in localStorage
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       // If the user data exists in localStorage, parse and set it to state
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   useEffect(() => {
//     // Whenever the `user` state changes, save it to localStorage
//     if (user.login) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user'); // Remove from localStorage when logged out
//     }
//   }, [user]); // This effect depends on `user` state

//   return (
//     <userContext.Provider value={{ user, setUser }}>
//       {children}
//     </userContext.Provider>
//   );
// }

// export default UserProvider;
