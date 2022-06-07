import React from "react";
import './HomeStyle.css'
import { Button } from "react-bootstrap";
import uiImg from '../images/Home.jpg';
import {Nav} from "react-bootstrap";
import NavbarComp from "./NavBar";



export const Home = () => {

    return (
        <>
        <NavbarComp/>
        <div className="Main">
           <div className="content">
              
              <h1>EHealth</h1>
              <pr>
                 We're just one click away to help you track your temperature.
                 <br/> Please Sign-In
              </pr>
              
              <Nav.Link href="/login"><Button variant="outline-primary"  >Sign In</Button></Nav.Link>
           </div>
           <div className="imgContainer">
              <img src={uiImg} alt="home"/>
           </div>
        </div>
    </>
      );
}
export default Home;