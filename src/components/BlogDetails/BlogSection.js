import React from 'react';
import styled from "styled-components";
const StyledTextarea = styled.textarea`
  width : 100%;
  height: 500px;
  border : none;
  resize: none;
  
`

function BlogSection(props) {
    const {title, text, picUrl, writer, writer_picUrl} = props.blog
    return (
        <>
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
                <div className="blog__details__text">
                    <img src={picUrl} alt="" />
                        <h3>{title}</h3>
                        <StyledTextarea readOnly>{text}</StyledTextarea>
                </div>
                <div className="blog__details__content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="blog__details__author">
                                <div className="blog__details__author__pic">
                                    <img src={writer_picUrl} alt="" />
                                </div>
                                <div className="blog__details__author__text">
                                    <h6>{writer}</h6>
                                    <span>Admin</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="blog__details__widget align-items-center">
                                <ul>
                                    <li><span>Categories:</span> Food</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
);
}

export default BlogSection;