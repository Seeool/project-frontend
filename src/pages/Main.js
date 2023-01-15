import React, {useEffect} from 'react';
import HeroSection from "../components/HeroSection/HeroSection";
import CategorySection from "../components/Main/CategorySection";
import FeaturedProduct from "../components/Main/FeaturedProduct/FeaturedProduct";
import LatestProductSection from "../components/Main/LatestProductSection";
import MainPageBlog from "../components/Main/MainPageBlog/MainPageBlog";
import appendScript from "../appendScript";
import Banner from "../components/Banner";

const Main = () => {
    useEffect(() => {
        appendScript("./js/main.js")
    },[])
    return (
        <>
            <FeaturedProduct/>
            <LatestProductSection/>
            <MainPageBlog/>
        </>
    );
};

export default Main;
