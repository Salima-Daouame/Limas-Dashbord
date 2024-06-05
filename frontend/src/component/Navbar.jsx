import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch,FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const image = localStorage.getItem('image');
    const dropdownRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        localStorage.removeItem("image");
        navigate("/signin");
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center '>
            <div className='flex items-center text-xl'>
                <FaBars className='text-white me-4 cursor-pointer'
                    onClick={() => setSidebarToggle(!sidebarToggle)}
                />
                <span className='text-white font-semibold'>Admin</span>
            </div>
            <div className='flex items-center gap-x-5'>
                <div className='relative md:w-64'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <button className='p-1 focus:outline-none text-white md:text-gray-700'>
                            <FaSearch />
                        </button>
                    </span>
                    <input
                        type="text"
                        className='w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-500 hidden md:block bg-gray-200 text-gray-700'
                        placeholder='Search...'
                    />
                </div>
                <div className='relative'>
                    <button className='text-white' onClick={handleDropdownToggle}>
                        {image ? (
                            <img src={image} alt="Admin" className='w-8 h-8 rounded-full' />
                        ) : (
                            <FaUserCircle className='w-8 h-8' />
                        )}
                    </button>
                    {dropdownOpen && (
                        <div ref={dropdownRef} className='z-10 absolute bg-yellow-50 opacity-90 rounded-lg shadow-md w-32 top-full right-0 mt-2'>
                            <ul className='py-2 text-sm text-gray-700'>
                                <li>
                                    <Link to="/profile" className='block px-4 py-2 hover:bg-gray-200'>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logout} className='block w-full text-left px-4 py-2 hover:bg-gray-200'>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
