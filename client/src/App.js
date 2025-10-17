import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/homePage/Home';
import Dashboard from './pages/dashboardPage/Dashboard';
import {setShop} from './app/shop/shopSlice';
import './App.css';
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const shopParam = params.get("shop");
        if (shopParam) dispatch(setShop(shopParam));
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;