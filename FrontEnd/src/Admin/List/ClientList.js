
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'
import Sidebar from '../../Components/sideBar';
import { Link, Navigate } from 'react-router-dom';
import './ClientList.css'
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_CLTS } from '../../redux/actions/customerActions';

export const ListClt= () => {
  const data=useSelector(state=>state.allCustomers);
  const dispatch=useDispatch();

  
  const [users, setResults] = useState([]);
  
  useEffect(() => {
    const Fresults=[]
   // console.log("data :",data);
      if( data.length>0){
        console.log("this data :" ,data);  
        data.forEach(element => {
          console.log("mac : ",element.macAddress);
          Fresults.push( {name:element.user.firstName+" " +element.user.lastName,
                          email:element.user.username,
                          macAddress:element.macAddress,
                          id:element._id
                        })
        }); 
        setResults(Fresults)
      }
      if(data.length===0) {
        //console.log("fuc");
        dispatch(GET_ALL_CLTS());
      }
     
     // console.log("kkk",data);
  },[data]);
  return (
    <div className="li" >
        <Sidebar></Sidebar>
      
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
      <div className='TableSize'>
      <Table striped variant="light" size='sm'>
        <tbody>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Mac address</td>
          <td></td>
        </tr>
        {
          users.map((item,i)=>
         
          <tr key={i}>
            <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
        <td>{item.macAddress}</td>
        
        <td >
								<a href={`/Admin/details/${item.email}`} className="table-link">
									<div className="fa-stack">
										<i className="fa fa-square fa-stack-2x"></i>
										<i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                    
									</div>
                  
								</a>
								
							</td>
        </tr>
          )
        }
        </tbody>
        
      </Table>
      </div>
    </div>
  );
}

export default ListClt;