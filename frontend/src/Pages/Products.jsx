// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddProduct from '../CrudOperations/AddProduct';
// import UpdateProduct from '../CrudOperations/UpdateProduct';

// function Products() {
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [ProductData, setProductData] = useState([]);
//     const [categories, setCategories] = useState([]); // State for categories

//     const openAddModal = () => setIsAddModalOpen(true);
//     const closeAddModal = () => setIsAddModalOpen(false);

//     const openEditModal = (product) => {
//         setSelectedProduct(product);
//         setIsEditModalOpen(true);
//     };

//     const closeEditModal = () => setIsEditModalOpen(false);

//     const handleCategoryChange = (e) => {
//         setSelectedProduct(e.target.value);
//     };

//     useEffect(() => {
//         fetchData();
//         fetchCategories();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const result = await axios.get("http://127.0.0.1:8000/api/produits");
//             setProductData(result.data.products); // Use the correct key from the response
//         } catch (err) {
//             console.log("Something went wrong", err);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const result = await axios.get("http://127.0.0.1:8000/api/categories");
//             setCategories(result.data.results); // Assuming your API returns categories in `results`
//         } catch (err) {
//             console.log("Something went wrong", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete("http://127.0.0.1:8000/api/produitsdelete/" + id);
//             const newProductData = ProductData.filter((item) => item.id !== id);
//             setProductData(newProductData);
//         } catch (err) {
//             console.log("Something went wrong", err);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
//             <div className="mb-4">
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Category:</label>
//                 <select id="category" name="category" className="mt-1 p-2 block w-full rounded-md border-gray-300" value={selectedProduct} onChange={handleCategoryChange}>
//                     <option value="All">All</option>
//                     {categories.map((category) => (
//                         <option key={category.id} value={category.categoriename}>
//                             {category.categoriename}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className="overflow-x-auto shadow-lg rounded-lg">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-2 px-4 border-b">ID</th>
//                             <th className="py-2 px-4 border-b">Name</th>
//                             <th className="py-2 px-4 border-b">Category</th>
//                             <th className="py-2 px-4 border-b">Description</th>
//                             <th className="py-2 px-4 border-b">Price</th>
//                             <th className="py-2 px-4 border-b">Image</th>
//                             <th className="py-2 px-4 border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {ProductData.map((product, i) => (
//                             <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                 <td className='py-4 px-6 border-b'>{i + 1}</td>
//                                 <td className='py-4 px-6 border-b'>{product.productname}</td>
//                                 <td className='py-4 px-6 border-b'>{product.categorie?.categoriename}</td>
//                                 <td className='py-4 px-6 border-b'>{product.description}</td>
//                                 <td className='py-4 px-6 border-b'>{product.price}</td>
//                                 <td className='py-4 px-6 border-b'>
//                                     <img
//                                         className="w-24 h-24 rounded-full mx-auto"
//                                         src={`http://127.0.0.1:8000/storage/${product.image}`}
//                                         alt=""
//                                     />
//                                 </td>
//                                 <td className='py-4 px-6 border-b'>
//                                     <button
//                                         className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300 mr-2'
//                                         onClick={() => openEditModal(product)}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(product.id)}
//                                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <button
//                 onClick={openAddModal}
//                 className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
//             >
//                 Add Product
//             </button>
//             {isAddModalOpen && <AddProduct onClose={closeAddModal} />}
//             {isEditModalOpen && <UpdateProduct onClose={closeEditModal} category={selectedProduct} />}
//         </div>
//     );
// }

// export default Products;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddProduct from '../CrudOperations/AddProduct';
import UpdateProduct from '../CrudOperations/UpdateProduct';

function Products() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productData, setProductData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => setIsEditModalOpen(false);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update selected category
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8081/api/produits");
            setProductData(result.data.products); // Use the correct key from the response
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8081/api/categories");
            setCategories(result.data.results); // Assuming your API returns categories in `results`
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://127.0.0.1:8081/api/produitsdelete/" + id);
            const newProductData = productData.filter((item) => item.id !== id);
            setProductData(newProductData);
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };

    const filteredProducts = selectedCategory === 'All' ? productData : productData.filter(product => product.categorie?.categoriename === selectedCategory);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Category:</label>
                <select id="category" name="category" className="mt-1 p-2 block w-full rounded-md border-gray-300" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.categoriename}>
                            {category.categoriename}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-1 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, i) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className='py-1 px-4 border-b'>{i + 1}</td>
                                <td className='py-4 px-6 border-b'>{product.productname}</td>
                                <td className='py-4 px-6 border-b'>{product.categorie?.categoriename}</td>
                                <td className='py-4 px-6 border-b'>{product.description}</td>
                                <td className='py-4 px-6 border-b'>{product.price} DH</td>
                                <td className='py-4 px-6 border-b'>
                                    <img
                                        className="w-24 h-24 rounded-lg mx-auto"
                                        src={`http://127.0.0.1:8081/storage/${product.image}`}
                                        alt=""
                                    />
                                </td>
                                <td className='py-4 px-6 border-b'>
                                    <button
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300 mr-2 mb-2'
                                        onClick={() => openEditModal(product)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded shadow-md transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
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
                Add Product
            </button>
            {isAddModalOpen && <AddProduct onClose={closeAddModal} />}
            {isEditModalOpen && <UpdateProduct onClose={closeEditModal} category={selectedProduct} />}
        </div>
    );
}

export default Products;
