
import Base from "../components/Base";
import userContext from "../context/userContext";


const About=()=>{
   return(
<userContext.Consumer>
  {(object)=>
  (
          <Base>
          {console.log(object)}
          <h4 style={{color:"blue"}}> This is our About Page with Header and Footer</h4>
                <h6  style={{color:"red"}} >Welcome user:{object.user.data.name && object.user.data.name }</h6>
          </Base>
   
  )

  }
</userContext.Consumer>

  );
};

export default About;