import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ sidebarToggle, setSidebarToggle }) => {
    return (
        <div className='flex'>
            <Sidebar sidebarToggle={sidebarToggle} />
            <div className={`${sidebarToggle ? '' : 'ml-64'} flex-grow`}>
                <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
                <div className='p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
