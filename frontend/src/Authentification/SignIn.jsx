import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link}  from 'react-router-dom'
import singin from '../Images/singup.png';

const SignIn = () => {
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });
    const [msg, setMsg] = useState('');
    let navigate = useNavigate();

    const { email, password } = admin;
    const onInputChange = e => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const signIn = async (e) => {
        e.preventDefault();
        
        if (email === '') {
            alert('Email Field is empty');
            return;
        }
        if (password === '') {
            alert('Password Field is empty');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8081/api/login", admin);
            const data = response.data;
            setMsg(data);
            localStorage.setItem("adminEmail", data.email);
            localStorage.setItem("adminName", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("adminpassword", data.password);
            localStorage.setItem('adminId', response.data.adminId);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                setMsg(error.response.data.error);
            } else {
                setMsg('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen  m-20 -mb-20 ">
            <div className="flex w-full md:w-4/5 lg:w-3/4  ">
                <div className="w-full md:w-1/2 flex justify-center">
                    <form className="bg-white p-8 rounded-xl shadow-lg   w-full max-w-md" onSubmit={signIn}>
                        <h2 className="text-3xl font-semibold mb-6 text-center">Sign In</h2>
                        <h4 className='bg-green-800 text-3xl'>{msg}</h4>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={email} onChange={onInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" placeholder="******************" value={password} onChange={onInputChange} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105" type="submit">
                                Sign In
                            </button>
                            <div><Link to='/signup' className='hover:text-sky-500 font-medium' >Create account</Link></div>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block w-1/2 bg-blue-500 flex justify-center object-cover rounded-lg shadow-2xl">
                    <img src={singin} alt="Sign In" className="w-full h-auto max-h-full" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;

