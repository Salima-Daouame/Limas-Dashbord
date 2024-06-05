// import React from 'react'
// import Navbar from './Navbar'
// import { Outlet } from 'react-router-dom';


// function Dashboard({ sidebarToggle, setSidebarToggle }) {
//   return (

//     // <div className={`${sidebarToggle ? "ml-0" : ""} `}>
//        <div className="ml-0">
//       <Navbar sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle} />
//       <div className="">
//         <Outlet />
//       </div>
//     </div>

//   )
// }

// export default Dashboard;
// src/components/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
    return (
        <div className={`${sidebarToggle ? 'ml-0' : ''}`}>
            <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
