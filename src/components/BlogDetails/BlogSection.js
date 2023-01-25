import React, {useRef} from 'react';
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 16px;
  color: #6f6f6f;
  overflow: hidden;
`

function BlogSection(props) {
    const {title, text, fileName, mid, memberFileName, roleSet, category} = props.blog
    const categories = ["뷰티", "음식", "생활/건강", "여행"]
    console.log(roleSet)
    let role
    if (roleSet.includes("USER")) {
        role = "USER"
    }
    if (roleSet.includes("MANAGER")) {
        role = "MANAGER"
    }
    if (roleSet.includes("ADMIN")) {
        role = "ADMIN"
    }

    const textarea = useRef();
    console.log(textarea)
    const handleResizeHeight = () => {
        textarea.current.style.height = 'auto'; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    };

    return (
        <>
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
                <div className="blog__details__text">
                    <img src={fileName} alt=""/>
                    <h3>{title}</h3>
                    <StyledTextarea ref={textarea} onChange={handleResizeHeight} defaultValue={text} readOnly></StyledTextarea>

                </div>
                <div className="blog__details__content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="blog__details__author">
                                <div className="blog__details__author__pic">
                                    <img src={memberFileName} alt=""/>
                                </div>
                                <div className="blog__details__author__text">
                                    <h6>{mid}</h6>
                                    <span>{role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{display: "flex", alignItems: 'center'}}>
                            <div className="blog__details__widget">
                                <ul>
                                    <li><span>카테고리:</span> {categories[category]}</li>
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