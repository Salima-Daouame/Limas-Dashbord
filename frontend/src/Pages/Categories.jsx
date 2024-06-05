import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategorie from '../CrudOperations/AddCategorie';
import UpdateCategorie from '../CrudOperations/UpdateCategorie';

function Categories() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [catgData, setCatgData] = useState([]);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/categories");
            setCatgData(result.data.results);
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://127.0.0.1:8000/api/categoriedelete/${id}`);
    //         setCatgData(catgData.filter(item => item.id !== id));
    //     } catch (err) {
    //         console.log("Something went wrong", err);
    //     }
    // };

    const handleDelete = async(id) => {
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/categoriedelete/"+id);
        const newCatgData=catgData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setCatgData(newCatgData);
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Categories</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 border-b text-left text-gray-600">ID</th>
                            <th className="py-3 px-6 border-b text-left text-gray-600">Name of Categories</th>
                            <th className="py-3 px-6 border-b text-left text-gray-600">Image</th>
                            <th className="py-3 px-6 border-b text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catgData.map((category, i) => (
                            <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className='py-4 px-6 border-b'>{i + 1}</td>
                                <td className='py-4 px-6 border-b'>{category.categoriename}</td>
                                <td className='py-4 px-6 border-b'>
                                    <img 
                                        className="w-24 h-24 rounded-full mx-auto" 
                                        src={`http://127.0.0.1:8000/storage/${category.image}`} 
                                        alt="" 
                                    />
                                </td>
                                <td className='py-4 px-6 border-b'>
                                    <button 
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300 mr-2' 
                                        onClick={() => openEditModal(category)} 
                                    >
                                       Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(category.id)} 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button 
                onClick={openAddModal} 
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
                Add Category
            </button>
            {isAddModalOpen && <AddCategorie onClose={closeAddModal} />}
            {isEditModalOpen && <UpdateCategorie onClose={closeEditModal} category={selectedCategory} />}
        </div>
    );
}

export default Categories;
