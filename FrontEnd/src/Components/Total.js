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
import TotalResults from "../Client/results/TOTAL_RESULTS";

import {  useDispatch, useSelector } from "react-redux";
import { FETCH_CLTS, FETCH_CLTS_Date, REMOVE_SELECTED_CUSTOMER, selectedCustomer } from "../redux/actions/customerActions";
import { useParams } from "react-router-dom";
import '../Admin/ClientDetails/HomeStyle.css'
export default function Total() {
  const data=useSelector(state=>state.fetchedData);
  const dispatch=useDispatch();
  const initialValues = {  date1: "", date2: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const { cltId } = useParams();
  const [results, setResults] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }; const[show,setShow]=useState(false);
  
  useEffect(() => {const Fresults=[]
    console.log("effect : ",cltId,data);
    if(data.length>0){
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
        console.log("res",Fresults);
        setResults(Fresults);
        dispatch(selectedCustomer(data[0].client))
    }
    else {
      dispatch(FETCH_CLTS("temp",cltId));
    }
  },[data]);

  useEffect(()=>{
    console.log("###########################################",data)
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
  },[formValues]);
  

  return (
    <>
   
   <div  >
      
      <div className="wrapper">
        <div className="total">
          <LineChart
            width={1300}
            height={300}
            data={results}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis interval={'preserveStartEnd'} dataKey="time"  />
            <YAxis domain={[20, 80]} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={1} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
      </div>
    </>
  );
}
