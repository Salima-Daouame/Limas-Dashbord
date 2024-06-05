import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import back from '../Images/back.jpg';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: localStorage.getItem('adminName') || '',
    email: localStorage.getItem('adminEmail') || '',
    password: '',
    image: localStorage.getItem('image') || '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  }, [selectedImage]);

  const handleTogglePassword = () => {
    setData({ ...data, password: '' }); // Reset password on toggle (optional)
    setShowPassword(!showPassword); // Assuming you have a state for showPassword
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setData(response.data);

      // Update localStorage with updated admin information
      localStorage.setItem('adminName', response.data.name);
      localStorage.setItem('adminEmail', response.data.email);
      localStorage.setItem('image', response.data.image); // Update image path if stored

    } catch (error) {
      console.error(error);
      // Handle errors (optional)
    }
  };



const handleImageClick = () => {
  fileInputRef.current.click();
};

return (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-cover bg-center h-64 relative" style={{ backgroundImage: `url(${back})` }}>
      <div className="bg-black bg-opacity-50 h-full flex items-center justify-center"></div>
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
        <img
          className="w-32 h-32 rounded-full border-4 border-white cursor-pointer"
          src={previewImage || data.image} // Use previewImage if available, otherwise fallback to data.image
          alt="profile"
          onClick={handleImageClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
    </header>

    <main className="max-w-4xl mx-auto mt-12 p-4 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{data.name}</h1>
      </div>
      <div className="mt-8 mx-auto max-w-md space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? 'text' : 'password'} // Assuming you have a state for showPassword
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button
              className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600 focus:outline-none"
              onClick={handleTogglePassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div> */}
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </main>
  </div>
);

};

export default Profile;


