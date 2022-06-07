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
import { FETCH_CLTS, FETCH_CLTS_Date } from "../../redux/actions/customerActions";

export default function Total() {
  const data=useSelector(state=>state.fetchedData);
  const [results, setResults] = useState([]);
  const initialValues = {  date1: "", date2: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const[show,setShow]=useState(false);
  //const authUser=useSelector((state)=>state.selectedCustomer);
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  useEffect(() => {
    const Fresults=[]
    //console.log("data",data,"!!!",(data.length>0&&(formValues.date1!=="" && formValues.date2!=="")));
      if( data.length>0){
        //console.log("-------------------------------");
        //console.log("use2",data); 
        data.forEach((e)=>{
          //console.log("::",e);
          const temp=e.temperature;
          const current=(new Date(e.createdAt));
          let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
          let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
          let time = cDate + ' ' + cTime;
          Fresults.push(
            {temperature:parseFloat(temp),
              day:time,
              humidity:parseFloat(0)}
            );
        });
        //console.log("res",Fresults);
        setResults(Fresults);
        //if((formValues.date1==="" && formValues.date2===""))
          setShow(false);
      }
      else  if(formValues.date1==="" && formValues.date2==="" ) {
        /*console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
        console.log("fuc",data);*/
        dispatch(FETCH_CLTS("temp",localStorage.getItem("authenticatedUser")));
        setShow(false)
      }
      //console.log(">>",formValues.date1!=="" , formValues.date2!=="" , data.length<=0);
      if(formValues.date1!=="" && formValues.date2!=="" && data.length<=0){
        //console.log("no data");
        setShow(true);
      }
      
     

     // if(date1)
  
      console.log("kkk");
  },[data]);
  useEffect(()=>{
   // console.log("###########################################")
    if(formValues.date1!=="" ){
     //console.log(formValues.date1,formValues.date2,"###");
      if(formValues.date2!==""){
        //console.log(formValues.date2,"here");
        dispatch(FETCH_CLTS_Date("temp",localStorage.getItem("authenticatedUser"),formValues.date1,formValues.date2));
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
  const customized = {
    marginLeft:300,
    marginTop: 20
  };
//datetime-local
  return (

    <> 
    <NavbarClt></NavbarClt>
      <h3 style={customized}>Total Readings from <input type="datetime-local" name="date1" className="datePicker" 
       value={formValues.date1}
      onChange={handleChange}
      ></input> to <input type="datetime-local"  className="datePicker" name="date2" value={formValues.date2}
      onChange={handleChange}></input></h3>
      {show?<>
        <h3>There is no data to show</h3>
      </>:
     <>
     
        
      <div className="wrapper">
        <div className="total">
          <LineChart
            width={1000}
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
            <XAxis dataKey="day" 
                            interval={'preserveStartEnd'} />
            <YAxis domain={[20, 80]} />
            <Tooltip />
            <Legend verticalAlign="bottom" height={1} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
      </>
      }
    </>
  );
}
