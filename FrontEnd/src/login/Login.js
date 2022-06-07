import React from 'react'
import {useState, useEffect } from "react";
import styles from './login.style.css'
import loginIcon from '../images/group.png'
import uiImg from '../images/log.svg'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {FETCH_CLTS, selectedCustomer} from '../redux/actions/customerActions';


export const Login = () => {
  const[state,stateChanger]=useState("");
  const dispath=useDispatch();
  const submit =() => {
    axios.post("http://localhost:4000/users/login",
     {
       username:formValues.email,
       password:formValues.password
     },
     { headers: {
                 "Content-Type":"application/json",
               }
     }
  
    ).then(function (response) {
      //console.log(response);
      //console.log("coookie:",document.cookie.jwt);
     document.cookie = "jwt=" + response.data[0].token/*token location*/
    // console.log(document.cookie);
     //console.log("user",response.data[1].user.isAdmin,"  ::  ",response.data[1].user.username);
     localStorage.setItem("authenticatedUser",response.data[1].user.username);
      dispath(selectedCustomer(response.data[1].user));
     if(response.data[1].user.isAdmin)stateChanger(toAdminHome());
     else stateChanger(toCltHome())
     //dispath(FETCH_CLTS("temp","smailox"));
     //
       })
       .catch(function (error) {
         console.log("error Login",error);
       });
   };
  const toAdminHome=()=>{ return (<Navigate to="/Admin/Home"/>);};
  const toCltHome=()=>{ return (<Navigate to="/client/home"/>);};

  const initialValues = {  email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!values.email) {
      errors.email = "Email is required!";
    } /*else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!"; 
    }*/
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
    
  };

  return (
    <div className="container">
      {/*{Object.keys(formErrors).length === 0 && isSubmit ? (
      
       <Navigate to="/client/home"/>
       
      ) : (
        <pre></pre>
      )
     
      }*/}

      <form onSubmit={handleSubmit}>
      <img className="icon-img" src={loginIcon} alt="icon"/>
        <div className="ui divider"></div>
       
        <div className="ui form">
        
          <div className={styles.field}>
            <input 
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <p>{formErrors.email}</p>
          
          <div className={styles.field}>
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue st2" onClick={submit}>Sign In</button>
        </div>
        
      </form>
      <div className="imgL">
         <img  src={uiImg} alt=""/>
      </div>
    <div>{state}</div>

    </div>
    
  );
}
export default Login;
