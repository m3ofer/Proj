import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import "./Form.css";
import Sidebar from "../../Components/sideBar";
import axios from "axios";
function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    topic:"",
    Longitude:"",
    Latitude:"",
    macAddress:""
  });

  const FormTitles = ["Sign Up", "Personal Info", "Topics"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
   
    <div className="App">
       <Sidebar></Sidebar>
    <div className="form">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
                const jwt=document.cookie.substring(4);
                 const token= "Bearer " + jwt;
                 console.log("JWT :",token);
                axios.post("http://localhost:4000/clients/addClient",
                  {
                    username:formData.username,
                    password:formData.password,
                    isAdmin:false,
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    longitude:formData.Longitude,
                    latitude:formData.Latitude,
                    macAddress:formData.macAddress,
                    
                  },
                  { headers: {
                             
                              "Authorization" : `${token}`
                            }
                  }
                
                  ).then(function (response) {
                    
                    })
                    .catch(function (error) {
                      console.log("error add",error);
                    });
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Form;
