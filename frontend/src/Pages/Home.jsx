// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Home() {
//     const [statistics, setStatistics] = useState({
//         totalUsers: 0,
//         totalCategories: 0,
//         totalAccessories: 0,
//         accessoriesPerCategory: 0,
//     });

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [categoryAccessoriesCount, setCategoryAccessoriesCount] = useState(0);

//     useEffect(() => {
//         fetchStatistics();
//         fetchCategories();
//     }, []);

//     const fetchStatistics = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/statistics');
//             setStatistics(response.data);
//         } catch (error) {
//             console.error("There was an error fetching the statistics!", error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/categories');
//             setCategories(response.data.results);
//         } catch (error) {
//             console.error("There was an error fetching the categories!", error);
//         }
//     };

//     const fetchCategoryAccessoriesCount = async (id) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/categoryaccessories/${id}`);
//             setCategoryAccessoriesCount(response.data.accessoriesCount);
//         } catch (error) {
//             console.error("There was an error fetching the accessories count for the selected category!", error);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         const id = e.target.value;
//         setSelectedCategory(id);
//         if (id) {
//             fetchCategoryAccessoriesCount(id);
//         } else {
//             setCategoryAccessoriesCount(0);
//         }
//     };

//     return (
//         <div id="Home" className="p-4">
//             <h1 className="text-3xl font-bold mb-8 ml-3 text-black">Home</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-2 mr-2">
//                 <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-green-300">
//                     <h2 className="text-2xl font-bold mb-2">Total Users</h2>
//                     <p className="text-3xl">{statistics.totalUsers}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-blue-300">
//                     <h2 className="text-2xl font-bold mb-2">Total Accessories</h2>
//                     <p className="text-3xl">{statistics.totalAccessories}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-orange-300">
//                     <h2 className="text-2xl font-bold mb-2">Total Categories</h2>
//                     <p className="text-3xl">{statistics.totalCategories}</p>
//                 </div>
//                 <br />
//                 <div className="">
//                 <h2 className="text-2xl font-bold mb-4 ml-3 text-black">Select Category</h2>
//                 <select
//                     className="p-2 border rounded-lg mb-4"
//                     value={selectedCategory}
//                     onChange={handleCategoryChange}
//                 >
//                     <option value="">Select a category</option>
//                     {categories.map((categorie) => (
//                         <option key={categorie.id} value={categorie.id}>
//                             {categorie.categoriename}
//                         </option>
//                     ))}
//                 </select>
                
//                 <div className="p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-red-300">
//                     <h2 className="text-2xl font-bold mb-2">Accessories for Selected Category</h2>
//                     <p className="text-3xl">{categoryAccessoriesCount}</p>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalCategories: 0,
        totalAccessories: 0,
        accessoriesPerCategory: 0,
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryAccessoriesCount, setCategoryAccessoriesCount] = useState(0);

    useEffect(() => {
        fetchStatistics();
        fetchCategories();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/statistics');
            setStatistics(response.data);
        } catch (error) {
            console.error("There was an error fetching the statistics!", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories');
            setCategories(response.data.results);
        } catch (error) {
            console.error("There was an error fetching the categories!", error);
        }
    };

    const fetchCategoryAccessoriesCount = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/categoryaccessories/${id}`);
            setCategoryAccessoriesCount(response.data.accessoriesCount);
        } catch (error) {
            console.error("There was an error fetching the accessories count for the selected category!", error);
        }
    };

    const handleCategoryChange = (e) => {
        const id = e.target.value;
        setSelectedCategory(id);
        if (id) {
            fetchCategoryAccessoriesCount(id);
        } else {
            setCategoryAccessoriesCount(0);
        }
    };

    return (
        <div id="Home" className="pl-4 pt-4">
            <h1 className="text-3xl font-bold font-mono mb-8 ml-3 text-black">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-2 mr-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2">Total Users</h2>
                    <p className="text-3xl">{statistics.totalUsers}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2">Total Accessories</h2>
                    <p className="text-3xl">{statistics.totalAccessories}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2">Total Categories</h2>
                    <p className="text-3xl">{statistics.totalCategories}</p>
                </div>
                <br />
                <div className="">
                    {/* <h2 className="text-2xl font-bold mb-4 ml-3 text-black font-mono">Select Category</h2> */}
                    <select
                        className="p-2 border rounded-lg mb-4 font-bold font-mono"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="" className='font-bold font-mono '>Select a category</option>
                        {categories.map((categorie) => (
                            <option key={categorie.id} value={categorie.id} className='font-bold font-sans'>
                                {categorie.categoriename}
                            </option>
                        ))}
                    </select>
                
                    <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                        <h2 className="text-2xl font-bold mb-2">Accessories for Selected Category</h2>
                        <p className="text-3xl">{categoryAccessoriesCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

