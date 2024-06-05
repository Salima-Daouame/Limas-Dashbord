import React, { useState } from 'react';
import { FaHome, FaListAlt } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { GoTriangleDown } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo1.png';

function Sidebar({ sidebarToggle }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${sidebarToggle ? 'hidden' : 'block'} w-64 bg-gray-900 fixed h-full px-4 py-2`}>
            <div className='my-2 mb-4 mx-4 flex justify-center'>
                <img src={Logo} alt="Logo" className='h-10 w-auto' />
            </div>
            <hr className='border-gray-600' />

            <ul className='mt-4 text-white font-bold space-y-2'>
                <li className='rounded hover:bg-blue-500 py-2 transition duration-200'>
                    <Link to="/" className='flex items-center px-3'>
                        <FaHome className='w-6 h-6 mr-2' />
                        Home
                    </Link>
                </li>
                <li className='rounded hover:bg-blue-500 py-2 transition duration-200'>
                    <Link to="/categories" className='flex items-center px-3'>
                        <FaListAlt className='w-6 h-6 mr-2' />
                        Categories
                    </Link>
                </li>
                <li className='rounded hover:bg-blue-500 py-2 transition duration-200'>
                    <Link to="/products" className='flex items-center px-3'>
                        <AiFillShop className='w-6 h-6 mr-2' />
                        Products
                    </Link>
                </li>
                <li className='relative'>
                    <button
                        type="button"
                        className='w-full text-left rounded hover:bg-blue-500 py-2 px-3 flex items-center transition duration-200'
                        onClick={toggleDropdown}
                    >
                        <HiArrowRightOnRectangle className='w-6 h-6 mr-2' />
                        Authentication
                        <GoTriangleDown className={`w-5 h-5 ml-auto transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {isOpen && (
                        <div className='absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-yellow-50 opacity-90 ring-1 ring-black ring-opacity-5 z-10'>
                            <div className='py-1'>
                                <Link to="/signup" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Sign Up</Link>
                                <hr />
                                <Link to="/signin" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Sign In</Link>
                            </div>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
