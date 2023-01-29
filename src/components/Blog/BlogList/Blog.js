import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setLogin} from "../../../store/loginSlice";


function Blog(props) {
    const {bid, title, regDate, replyCount, fileName, blogDeleted, setBlogDeleted} = props.blog
    const date = new Date(regDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()


    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="blog__item">
                    <div className="blog__item__pic">
                        <img src={fileName} alt=""/>
                    </div>
                    <div className="blog__item__text">
                        <ul>
                            <li><i className="fa fa-calendar-o"></i> {year}년 {month}월 {day}일</li>
                            <li><i className="fa fa-comment-o"></i> {replyCount}</li>
                        </ul>
                        <h5>{title}</h5>
                        <Link to={`/blog-details?bid=${bid}`} className="blog__btn"
                        >읽어보기 <span className="arrow_right"></span
                        ></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;