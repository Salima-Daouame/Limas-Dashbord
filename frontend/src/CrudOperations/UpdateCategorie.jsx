import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'

function UpdateCategorie({ onClose, category }) {
    const [catgField, setCatgField] = useState({
        categoriename: '',
        image: null,
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (category) {
            setCatgField({
                categoriename: category.categoriename,
                image: null,
            });
        }
    }, [category]);

    const changeUserFieldHandler = (e) => {
        const { name, value, files } = e.target;
        setCatgField((prevField) => ({
            ...prevField,
            [name]: files ? files[0] : value,
        }));
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();

        if (!catgField.categoriename) {
            alert('Category name is required.');
            return;
        }

        const formData = new FormData();
        formData.append('categoriename', catgField.categoriename);
        if (catgField.image) {
            formData.append('image', catgField.image);
        }
        
      try {
        await axios.put
        (`http://127.0.0.1:8081/api/categoriesupdate/${category.id}`,formData);
        navigate('/categories');
        
        } catch (err) {
            console.error('Something went wrong:', err);
          
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4">Update Category</h2>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name of Category
                        </label>
                        <input
                            type="text"
                            id="categoriename"
                            name="categoriename"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300"
                            value={catgField.categoriename}
                            onChange={changeUserFieldHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300"
                            name="image"
                            onChange={changeUserFieldHandler}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateCategorie;



