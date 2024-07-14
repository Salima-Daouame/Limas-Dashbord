import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signupImage from '../Images/singup.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('password_confirmation', formData.confirmPassword); // Ensure this matches validation rules
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8081/api/register', data);
      alert(response.data.message);
      // Store admin data in local storage
    localStorage.setItem('admin', JSON.stringify(formData));
      navigate('/signin');
    } catch (error) {
      console.error('There was an error!', error);
      alert('There was an error!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden m-20 -mb-20">
      <div className="flex w-full md:w-4/5 lg:w-3/4">
        <div className="w-full md:w-1/2 flex justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl  w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="******************" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Profile Picture
              </label>
              <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" onChange={handleFileChange} />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-blue-500 flex justify-center object-cover rounded-lg shadow-lg">
          <img src={signupImage} alt="Sign Up" className="w-full h-auto max-h-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
