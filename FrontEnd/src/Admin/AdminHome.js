import Sidebar from "../Components/sideBar";
import { Nav} from "react-bootstrap";
import "./home.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import GMap2 from "../Components/gMap2";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_CLTS, GET_ALL_CLTS,selectedCustomer } from "../redux/actions/customerActions";
import { useEffect, useState } from "react";

export const AdminHome = () => {
  const data=useSelector(state=>state.allCustomers);
  const selecteCustomer=useSelector(state=>state.selectedCustomer);
  const dataUser=useSelector(state=>state.fetchedData);
  const [results, setResults] = useState([]);
  const dispatch=useDispatch();
 
  useEffect(() => {
    //const Fresults=[]
   // console.log("data :",data);
      if( data.length>0){
     //   console.log("use2",data); 
        /*data.forEach((e)=>{
          console.log("::",e);
          const temp=e.temperature;
          const time=(new Date(e.createdAt)).toLocaleTimeString('it-IT');
          Fresults.push(
            {temp:parseFloat(temp),
              time:time,
              humidity:parseFloat(0)}
            );
        });*/
       // console.log("res",Fresults);
        
      }
      if(data.length===0) {
        //console.log("fuc");
        dispatch(GET_ALL_CLTS());
      }
     
     // console.log("kkk",data);
  },[data]);
  useEffect(()=>{
  //  console.log("selectMap CustomerEffect: ",selecteCustomer,selecteCustomer.lat,"#####",dataUser);
    if(selecteCustomer!=null){
     if(selecteCustomer.lat!==undefined){
       console.log("here we go ");
       dispatch(FETCH_CLTS("temp",selecteCustomer.title));
       //dispatch(selectedCustomer(null));
     }}
  },[selecteCustomer]);
  useEffect(()=>{
  //  console.log("userData CustomerEffect: ","#####",dataUser);
    const Fresults=[]
    if(dataUser.length>0){
      //  console.log("dataUser.length>0",dataUser.length);
        dataUser.forEach((e)=>{
          //console.log("::",e.temperature);
          const temp=e.temperature;
          const time=(new Date(e.createdAt)).toLocaleTimeString('it-IT');
          Fresults.push(
            {temp:parseFloat(temp),
              time:time,
              humidity:parseFloat(0)}
            );
        });
        setResults(Fresults);
      }
  },[dataUser]);
    return(
        <div className="AdHome">
                <Nav>
                    <Sidebar></Sidebar>
                </Nav>
                <div className="map">
                  <GMap2></GMap2>
                </div>
            
            
             <div className="chart">
                    <LineChart
                      width={960}
                      height={340}
                      data={results}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" 
                                      interval={'preserveStartEnd'} />
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
           
    );
}
    
export default AdminHome;