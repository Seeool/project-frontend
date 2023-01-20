import React, {useEffect} from 'react';
import FeaturedProductList from "../components/Main/FeaturedProductList/FeaturedProductList";
import LatestProductSection from "../components/Main/LatestProductSection";
import MainPageBlogList from "../components/Main/MainPageBlog/MainPageBlogList";
import appendScript from "../appendScript";

const Main = () => {
    return (
        <>
            <FeaturedProductList/>
            <LatestProductSection/>
            <MainPageBlogList/>
        </>
    );
};

export default Main;
