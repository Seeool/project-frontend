import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "./pages/Main";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import React, {useEffect} from "react";
import appendScript from "./appendScript";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Banner from "./components/Banner";
import $ from "jquery";
import ShopDetails from "./pages/ShopDetails";
import ShopingCart from "./pages/ShopingCart";


function App() {

    return (
        <>
            <Header/>
            <HeroSection/>
            <Banner/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/shop-grid"} element={<Shop/>}/>
                <Route path={"/blog"} element={<Blog/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
                <Route path={"/shop-details"} element={<ShopDetails/>}/>
                <Route pate={"/shoping-cart"} element={<ShopingCart/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
