import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../HomeClt.css";
import NavbarClt from "./NavBarClient";
import {  useDispatch, useSelector } from "react-redux";
import { FETCH_CLTS, FETCH_CLTS_Date, REMOVE_SELECTED_CUSTOMER } from "../../redux/actions/customerActions";
import axios from "axios";


export default function Single() {
  const data=useSelector(state=>state.fetchedData);
  const [temp,changeTemp]=useState(100);
  /*const renderList=data.map((product)=>{
    console.log("shit",product);
  });*/

  const dispatch=useDispatch();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const date2 = `${current.getDate()+1}/${current.getMonth()+1}/${current.getFullYear()}`;

  //var results=[{temp:"10",time:"10:10"}];
  const [results, setResults] = useState([]);

  useEffect(() => {
    const Fresults=[];
    console.log(date,"::",date2);
    //console.log(data);
    //authenticatedUser=localStorage.getItem(authenticatedUser);
      if(data!==undefined && data.length>0){
     //   console.log("use2",data); 
        data.forEach((e)=>{
        //  console.log("::",e);
          const temp=e.temperature;
          const time=(new Date(e.createdAt)).toLocaleTimeString('it-IT');
          Fresults.push(
            {temp:parseFloat(temp),
              time:time,
              humidity:parseFloat(0)}
            );
           
        });
        //console.log("res",Fresults);
        setResults(Fresults);
        //changeTemp(23);
        //console.log(temp,Fresults[Fresults.length-2].temp);
      }
      else {
       // console.log("fuc");
        dispatch(FETCH_CLTS_Date("temp",localStorage.getItem("authenticatedUser"),"2022-06-07T10:20","2022-06-08T16:46"));
      }
   
      //console.log("kkk");
  },[data,temp]);
  
 function changeButton(){
  //console.log("shiiit");
  changeTemp(22); 
  const jwt=document.cookie.substring(4);
                 const token= "Bearer " + jwt;
                 console.log("JWT :",token);
  axios.get("http://localhost:4000/clients/turnOff",
  { headers: {
             
              "Authorization" : `${token}`
            }
  }

  ).then(function (response) {
    
    })
    .catch(function (error) {
      console.log("error add",error);
    });
 }

  return (
    <>
      <NavbarClt></NavbarClt>
      <h1>Single Readings for {date}</h1>
      {(temp>23) &&
                    <div className='div-button'>
                    <button className='button' onClick={changeButton} id="id">Turn off</button>
                </div>
                }
        <div className="single">
        <div>
          <h4>Temperature</h4>
          <LineChart
            width={700}
            height={500}
            data={results}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 110]} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={1} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff2a00"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div>
          <h4>Humidity</h4>
          <LineChart
            width={700}
            height={500}
            data={results}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[20, 110]} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={1} />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#9b12aa"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </>
  );
}
