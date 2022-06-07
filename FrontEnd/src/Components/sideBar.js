import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div
        style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#0d6efd">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/Admin/Home"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
            >
              E-Health
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/Admin/Home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Admin/Add" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="plus">ADD</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Admin/ClientList" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">List</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <h1>_________________</h1>
          <a
              href="/"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
            >
              LOG OUT
            </a>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
};
export default Sidebar;