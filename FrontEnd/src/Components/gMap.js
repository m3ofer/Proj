import React from 'react';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const customizeMap = {
  width: '90%',
  height: '40%',
  marginLeft:50,
  marginTop:70
};
const iconList = {
    icon1: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon2: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
  };
  class Gmap extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
         cords: [
          {latitude: 34.0253698, longitude: -5.0117561,icon:iconList.icon1,title: "Ahmadi hmed"},
          {latitude: 33.8939831, longitude: -5.2073479,icon:iconList.icon1,title: "BenSaid Ali"},
          {latitude: 34.0460276, longitude: -5.070749,icon:iconList.icon1,title: "Rachidi ghali"},
          {latitude: 34.0238589, longitude: -5.0085474,icon:iconList.icon1,title: "Ben hamed"},
          {latitude: 34.0230284,longitude: -5.0054878,icon:iconList.icon1,title: "Idrissi ahmed "},
          {latitude: 33.195489, longitude:-4.838175,icon:iconList.icon1,title: "Asaadi driss"},
        ] 
        
      }
    }
  
    drawMarker = () => {
      return this.state.cords.map(function(store, i) {
        //if(true) {store.icon=iconList.icon2;}
        return <Marker key={i} id={i} position={{
         lat: store.latitude,
         lng: store.longitude
         
       }}
          
       icon={{
          url: store.icon,
          scaledSize: new window.google.maps.Size(50, 50)
        }}
        title = {store.title}
       onClick={() => alert(store.title+"  , Lang : "+store.longitude+" , Lat : "+store.latitude)
            
      } />
      })
    }
  
    render() {
      return (
        
          <Map
            google={this.props.google}
            style={customizeMap}
            zoom={15}
            initialCenter={{ 
              lat:34.0238589, 
              lng:-5.0085474
          }}>
            {this.drawMarker()}
          </Map>
          
      );
    }
  }
  export default GoogleApiWrapper({
      apiKey: 'AIzaSyBL6FR8VIFAbFBqTrx9j6BtOysa8olDAKw'
    })(Gmap);