import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "./pages/Main";
import Shop from "./pages/Shop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Banner from "./components/Banner";
import ShopDetails from "./pages/ShopDetails";
import ShoppingCart from "./pages/ShoppingCart";
import BlogDetails from "./pages/BlogDetails";
import ShopDetailsModify from "./pages/ShopDetailsModify";
import NaverOauthLogin from "./pages/SocialLoginRedirect/NaverOauthLogin";
import KakaoOauthLogin from "./pages/SocialLoginRedirect/KakaoOauthLogin";
import GoogleOauthLogin from "./pages/SocialLoginRedirect/GoogleOauthLogin";
import ShopDetailsCreate from "./pages/ShopDetailsCreate";



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
                <Route path={"/shop-details-create"} element={<ShopDetailsCreate/>}/>
                <Route path={"/shop-details-modify"} element={<ShopDetailsModify/>}/>
                <Route path={"/shopping-cart"} element={<ShoppingCart/>}/>
                <Route path={"/blog-details"} element={<BlogDetails/>}/>
                <Route path={"/oauthNaver/"} element={<NaverOauthLogin />}/>
                <Route path={"/oauthKakao/"} element={<KakaoOauthLogin />}/>
                <Route path={"/oauthGoogle/"} element={<GoogleOauthLogin />}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
