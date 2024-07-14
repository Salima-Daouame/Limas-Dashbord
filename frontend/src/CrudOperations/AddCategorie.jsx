
import React, { useState } from 'react';
import axios from 'axios';
// import Categories from '../Pages/Categories';

function AddCategorie({ onClose }) {
    const [userField, setUserField] = useState({
        categoriename: "",
        image: null, // image should be initialized to null
    });

    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setUserField({
                ...userField,
                [name]: e.target.files[0] // for file input, use e.target.files[0]
            });
        } else {
            setUserField({
                ...userField,
                [name]: value
            });
        }
    }

     const [loading, setLoading] = useState(false);

    const onSubmitChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoriename', userField.categoriename);
        formData.append('image', userField.image);

        try {
            const response = await axios.post("http://127.0.0.1:8081/api/addcatecategorie", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            setLoading(true);
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }

    if (loading) {
        // 
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name of Category</label>
                        <input type="text" id="name" name="categoriename" className="mt-1 p-2 block w-full rounded-md border-gray-300" onChange={changeUserFieldHandler} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" className="mt-1 p-2 block w-full rounded-md border-gray-300" name="image" onChange={changeUserFieldHandler} />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategorie;
