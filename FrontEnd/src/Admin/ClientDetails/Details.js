import React, { useEffect, useState } from "react";
import './HomeStyle.css'
import Sidebar from "../../Components/sideBar";
import Total from "../../Components/Total";
import map from '../../images/map.png'
import user from '../../images/woman.png'
import tel from '../../images/telephone.png'
import topic from '../../images/topic.png'
import mail from '../../images/gmail.png'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_CLTS, FETCH_CLTS_Date } from "../../redux/actions/customerActions";

export const Details = () => {
  const data=useSelector(state=>state.fetchedData);
  const userD=useSelector(state=>state.selectedCustomer);
  const dispatch=useDispatch();
  const [results, setResults] = useState([]);
  const initialValues = {  date1: "", date2: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const[show,setShow]=useState(false);
  const[ userDetails,setUserDetails]=useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  {/**<h3 id="h3"> From  <input type="datetime-local" name="date1" className="datePicker" 
       value={formValues.date1}
      onChange={handleChange}
      ></input> to <input type="datetime-local"  className="datePicker" name="date2" value={formValues.date2}
      onChange={handleChange}></input></h3> */}
  const { cltId } = useParams();
  useEffect(()=>{
     //console.log("###########################################",data,"user",userD,"::",userD.location!==undefined)
     if(formValues.date1!=="" ){
      //console.log(formValues.date1,formValues.date2,"###");
       if(formValues.date2!==""){
         console.log(formValues.date2,"here");
         dispatch(FETCH_CLTS_Date("temp",cltId,formValues.date1,formValues.date2));
         //console.log("here2 ; she");
         setShow(true);
       }
       else{
        setShow(false);
       }
     }
     else{
       setShow(false);
     }
     if(userD.location!==undefined){
       setUserDetails({firstName:userD.user.firstName,lastName:userD.user.lastName
                      ,lat:userD.location.latitude,lng:userD.location.longitude,
                        email :userD.user.username});
     }
   },[formValues,userD]);
  //console.log("##########",cltId);
    return (
        <>
        
      <div className="Details">
        <Sidebar></Sidebar>
        <div class="col-lg-12">
          <div class="card mt-4 border-0 mb-4">
            <div class="row">

            <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail pl-0">
                  <div class="mr-3 align-self-center">
                    <img src={user}/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Name</h6>
                    <r class="">{userDetails.firstName}
                      <br/> {userDetails.lastName}</r>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail pl-0">
                  <div class="mr-3 align-self-center">
                    <img src={map}/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Address</h6>
                    <r class="">{userDetails.lat}
                      <br/>{userDetails.lng}</r>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail">
                  <div class="mr-3 align-self-center">
                    <img src={tel}/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Phone</h6>
                    <r class="">251 546 9442
                      <br/> 630 446 8851</r>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail">
                  <div class="mr-3 align-self-center">
                    <img src={mail}/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Email</h6>
                    <r class="">
                    {userDetails.email}
                      
                    </r>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail">
                  <div class="mr-3 align-self-center">
                    <img src={topic}/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Topics</h6>
                    <r class="">
                        Temperature
                      <br/>
                    </r>
                  </div>
                </div>
              </div>
          </div>    
        </div>    
              

               <div className="chartContainer" >

               <Total></Total>
              
           </div>
        </div>
        </div>
    </>
      );
}
export default Details;