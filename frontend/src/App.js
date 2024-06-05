import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import SignUp from './Authentification/SignUp';
import SignIn from './Authentification/SignIn';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<ProtectedRoute><Layout sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} /></ProtectedRoute>}>
                    <Route index element={<Home />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="products" element={<Products />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
}

export default App;
