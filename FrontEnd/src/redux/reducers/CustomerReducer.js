import { ActionTypes } from "../constants/Action-types"
/*const iconList = {
    icon1: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon2: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
  };*/
const initialState=
    [
        /*{lat: 34.0253698, lng: -5.0117561,icon:iconList.icon1,title: "Ahmadi hmed"},
        {lat: 33.8939831, lng: -5.2073479,icon:iconList.icon1,title: "BenSaid Ali"},
        {lat: 34.0460276, lng: -5.070749,icon:iconList.icon1,title: "Rachidi ghali"},
        {lat: 34.0238589, lng: -5.0085474,icon:iconList.icon1,title: "Ben hamed"},
        {lat: 34.0230284, lng: -5.0054878,icon:iconList.icon1,title: "Idrissi ahmed "},
        {lat: 33.195489,  lng:-4.838175,icon:iconList.icon1,title: "Asaadi driss"},*/
    ]
;
export const customerReducer=(state=initialState,action)=>{
    switch(action.type){
        case ActionTypes.SET_CUSTOMERS:{
            //console.log("state",state);
            return action.payload;}
        case ActionTypes.ADD_CUSTOMER:
            state=[...state,action.payload];
            return state;
        default :return state;
    }
};
export const selectedCustomerReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_CUSTOMER://...state, ...
        return  payload ;
      case ActionTypes.REMOVE_SELECTED_CUSTOMER:
        return {};
      default:
        return state;
    }
  };
  export const fetchedCustomerReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case ActionTypes.FETCH_CLTS://...state, ...
        //console.log("we ever reach here : reducer fetched",payload);
        return  payload ;
  
      default:
        return state;
    }
  };