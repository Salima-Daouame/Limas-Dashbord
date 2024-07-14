import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct({ onClose }) {
    const [userField, setUserField] = useState({
        productname: "",
        description: "",
        price: "",
        image: null,
        categorie_id: ""
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8081/api/categories");
            setCategories(result.data.results);
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setUserField({
                ...userField,
                [name]: e.target.files[0]
            });
        } else {
            setUserField({
                ...userField,
                [name]: value
            });
        }
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        if (userField.price < 0) {
            alert("Price cannot be less than 0");
            return;
        }

        const formData = new FormData();
        formData.append('productname', userField.productname);
        formData.append('description', userField.description);
        formData.append('price', userField.price);
        formData.append('image', userField.image);
        formData.append('categorie_id', userField.categorie_id);

        try {
            const response = await axios.post("http://127.0.0.1:8081/api/addproduit", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            setLoading(true);
        } catch (err) {
            console.log("Something went wrong", err);
        }

        setUserField({
            productname: "",
            description: "",
            price: "",
            image: null,
            categorie_id: ""
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6">Add Product</h2>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productname">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productname"
                            value={userField.productname}
                            onChange={changeUserFieldHandler}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Product Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={userField.description}
                            onChange={changeUserFieldHandler}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={userField.price}
                            onChange={changeUserFieldHandler}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={changeUserFieldHandler}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorie_id">
                            Category
                        </label>
                        <select
                            name="categorie_id"
                            value={userField.categorie_id}
                            onChange={changeUserFieldHandler}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.categoriename}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default AddProduct;
