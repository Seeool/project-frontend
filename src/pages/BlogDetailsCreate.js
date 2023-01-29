import React, {useEffect, useRef, useState} from 'react';
import BlogSideBar from "../components/BlogDetails/BlogSideBar";
import BlogBanner from "../components/BlogDetails/BlogBanner";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import BlogSection from "../components/BlogDetails/BlogSection";
import BlogSectionCreate from "../components/BlogDetails/BlogSectionCreate";

function BlogDetails(props) {

    return (
        <>
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <BlogSectionCreate/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetails;