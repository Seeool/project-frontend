import React, {useEffect} from 'react';
import BlogSideBar from "../components/BlogDetails/BlogSideBar";
import BlogBanner from "../components/BlogDetails/BlogBanner";
import appendScript from "../appendScript";
import BlogSection from "../components/BlogDetails/BlogSection";

function BlogDetails(props) {
    useEffect(() => {
        appendScript("./js/main.js")
    }, [])
    const blog = {
        id : 1,
        title : 'The Moment You Need To Remove Garlic From The Menu',
        writer : 'Michael Scofield',
        writer_picUrl : 'img/02.jpg',
        date : 'January 14, 2019',
        replyCount : 8,
        category : 'Food',
        picUrl : "img/02.jpg",
        text : 'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet\n' +
            '                            dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit\n' +
            '                            aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur\n' +
            '                            sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada.\n' +
            '                            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus.\n' +
            '                            Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis\n' +
            '                            quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada\n' +
            '                            feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
    }
    return (
        <>
            <BlogBanner blog={blog}/>
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <BlogSideBar/>
                        <BlogSection blog={blog}/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetails;