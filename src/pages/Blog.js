import React, {useEffect} from 'react';
import HeroSection from "../components/HeroSection/HeroSection";
import Banner from "../components/Banner";
import BlogSideBar from "../components/Blog/BlogSideBar";
import BlogList from "../components/Blog/BlogList/BlogList";
import appendScript from "../appendScript";

const Blog = () => {
    return (
        <>

            <section className="blog spad">
                <div className="container">
                    <div className="row">
                        <BlogSideBar/>
                        <BlogList/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
