import { myAxious } from "./helper";

export const signUp=(user)=>{
  return myAxious.post('/api/ReactJsApis/registerWithoutPassword',user).then((response)=>response.data);
}

export const loginUser=(loginDetails)=>{
  return myAxious.post('/api/ReactJsApis/Login',loginDetails).then((response)=>response.data);
}
//done

//get userdetails by Id 

export const loadUserDetailsById=(Id)=>{
  return myAxious.get(`/api/ReactJsApis/getUserDetailsById?Id=${Id}`).then(response=>response.data); 
}


