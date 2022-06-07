import React, { useEffect, useRef } from 'react';
import {  GoogleApiWrapper } from 'google-maps-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCustomer } from '../redux/actions/customerActions';
/*const customizeMap = {
  width: '90%',
  height: '40%',
  marginLeft:50,
  marginTop:70
};*/
const GMaps = () => {
  const googleMapRef = useRef(null);
  const customers=useSelector((state)=>state.allCustomers);
  const dispatch=useDispatch();
  let googleMap = null;
  const handleClick =(x)=> {
   // console.log("hey",x,customers);
    dispatch(selectedCustomer(x));
    //navigator.geolocation.getCurrentPosition((position)=>{console.log("position",position.coords);})
  };
  // list of icons
  const iconList = {
    icon1: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
  }

  // list of the marker object along with icon
  const markerList = [];
  /*[
    { lat: 59.2967322, lng: 18.0009393, icon: iconList.icon2 ,title: "Ahmadi hmed"},
    { lat: 59.2980245, lng: 17.9971503, icon: iconList.icon2 ,title: "Ahmadi hmed"},
    { lat: 59.2981078, lng: 17.9980875, icon: iconList.icon2 ,title: "Ahmadi hmed"},
    { lat: 59.2987638, lng: 17.9917639, icon: iconList.icon2 ,title: "Ahmadi hmed"}
  ]*/

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
   // console.log("customers map",customers);
    if(customers.length>0){
      customers.forEach(element => {
        markerList.push({lat:parseFloat(element.location.latitude),lng:parseFloat(element.location.longitude)
          ,icon:iconList.icon2,
          title:element.user.username,id:element._id});
      });
      
    markerList.map(x => {
    //  console.log("markList : ",x);
      const marker = createMarker(x);
      marker.addListener("click", () => {
        handleClick(x);
      });
      bounds.extend(marker.position);
     
    });
    googleMap.fitBounds(bounds);
    } // the map to contain all markers
   
  }, [customers]);


  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat:34.0238589, lng: -5.0085474},
      zoom: 8
    });
  }

  // create marker on google map
  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker width and height
      scaledSize: new window.google.maps.Size(50, 50)
    },
    title: markerObj.title,
    
  });

  return <div
    ref={googleMapRef}
    style={{ width: 1100, height:300 ,
      marginLeft:50,
      marginTop:30}}
  />
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBL6FR8VIFAbFBqTrx9j6BtOysa8olDAKw'
  })(GMaps);