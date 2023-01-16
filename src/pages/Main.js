import React, {useEffect} from 'react';
import FeaturedProduct from "../components/Main/FeaturedProduct/FeaturedProduct";
import LatestProductSection from "../components/Main/LatestProductSection";
import MainPageBlog from "../components/Main/MainPageBlog/MainPageBlog";
import appendScript from "../appendScript";

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
