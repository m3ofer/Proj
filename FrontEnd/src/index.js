import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Single from './Client/components/Single';
import Total from './Client/components/Total';
import Contact from './HomePage/Contact';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Login from './login/Login';
import Form from "./Admin/Add/Form";
import AdminHome from "./Admin/AdminHome";
import ListClt from './Admin/List/ClientList';
import Details from './Admin/ClientDetails/Details';
import store,{persitStore} from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
// <PersistGate loading={null} persistor={persitStore}>
root.render(
    <div>
  <Provider store={store}>
 
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/contact-us" exact element={<Contact />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/client/home" exact element={<Single />} />
        <Route path="/client/history" exact element={<Total />} />
        <Route path="/Admin/Add" exact element={<Form />} />
        <Route path="/Admin/Home" exact element={<AdminHome />} />
        <Route path="/Admin/ClientList" exact element={<ListClt/>} />
        <Route path="/Admin/details/:cltId" exact element={<Details/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </div>
);


