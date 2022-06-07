import axios from "axios";
import { ActionTypes } from "../constants/Action-types"
export const setCustomers=(customers)=>{
  //  console.log("cus",customers);
    return{
        type:ActionTypes.SET_CUSTOMERS,
        payload:customers,
    };
};
export const selectedCustomer=(customer)=>{
    //console.log("we are here selectedCustomer :" ,customer);
    return{
        type:ActionTypes.SELECTED_CUSTOMER,
        payload:customer,
    };
};
export const addCustomer=(customer)=>{
    return{
        type:ActionTypes.ADD_CUSTOMER,
        payload:customer,
    };
};
/**clients/clientsList */
export const FETCH_CLTS=(topic,user)=>{
    return async function(dispatch,getState){
        const jwt=document.cookie.substring(4);
        const token= "Bearer " + jwt;
    //    console.log(token,"::::::::::::",topic,"€€",user);
        const response=await axios.get("http://localhost:4000/data",{
            headers: {"Authorization" : `${token}`,},
            params:{
                topic:topic,
                username:user
              }
          })
         // console.log("Cust/action/>>>data : ",response.data);
          dispatch({type:ActionTypes.FETCH_CLTS,payload:response.data});
    }
}
export const GET_ALL_CLTS=()=>{
    /*const iconList = {
        icon1: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
        icon2: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
      };*/
      return async function(dispatch,getState){
      /*const response= [
        {lat: 34.0253698, lng: -5.0117561,icon:iconList.icon1,title: "Ahmadi hmed"},
        {lat: 33.8939831, lng: -5.2073479,icon:iconList.icon1,title: "BenSaid Ali"},
        {lat: 34.0460276, lng: -5.070749,icon:iconList.icon1,title: "Rachidi ghali"},
        {lat: 34.0238589, lng: -5.0085474,icon:iconList.icon1,title: "Ben hamed"},
        {lat: 34.0230284, lng: -5.0054878,icon:iconList.icon1,title: "Idrissi ahmed "},
        {lat: 33.195489,  lng:-4.838175,icon:iconList.icon1,title: "Asaadi driss"},
    ];*/
    const jwt=document.cookie.substring(4);
        const token= "Bearer " + jwt;
     //   console.log("Cust/actioncltList/>>token :",token);
    const response=await axios.get("http://localhost:4000/clients/clientsList",{
            headers: {"Authorization" : `${token}`,},
            
          })
       //   console.log("Cust/actioncltList/>>>data : ",response.data);
    dispatch({type:ActionTypes.SET_CUSTOMERS,payload:response.data});}
}
export const FETCH_CLTS_Date=(topic,user,date1,date2)=>{
    return async function(dispatch,getState){
        const jwt=document.cookie.substring(4);
        const token= "Bearer " + jwt;
        //console.log("cltDate",date1,date2);
        const response=await axios.get("http://localhost:4000/dataIntervall",{
            headers: {"Authorization" : `${token}`,},
            params:{
                topic:topic,
                username:'khaoula11',
                date1:date1,
                date2:date2
              }
          });
          console.log("axiosData",response.data);
          dispatch({type:ActionTypes.FETCH_CLTS,payload:response.data});
    }
}
export const REMOVE_SELECTED_CUSTOMER = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_CUSTOMER,
    };
  };
