import React, {useEffect} from 'react';
import BlogSideBar from "../components/Blog/BlogSideBar";
import BlogList from "../components/Blog/BlogList/BlogList";


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
