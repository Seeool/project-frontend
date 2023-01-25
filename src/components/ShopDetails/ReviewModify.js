import React, {useEffect, useRef, useState} from 'react';
import $ from "jquery";
import styled from "styled-components";

const TextAreaP = styled.textarea`
  color: #6f6f6f;
  width: 100%;
  resize: none;
  overflow: hidden;
  //border: none;
`

const Review = (props) => {
    const {review} = props
    const starring = useRef()

    const [grade, setGrade] = useState(0)
    const [text, setText] = useState('')

    const handleGrade = (e) => {
        setGrade(e.target.value)
        if (e.target.value > 5) {
            setGrade(5)
        }
    }

    useEffect(() => {
        setGrade(review.grade)
        setText(review.text)
    },[])

    const stars = () => {
        let integer = Math.floor(review.grade)
        let decimal = review.grade - Math.floor(review.grade)
        if (decimal >= 0.5) {
            $(".review__details__rating").prepend('<i class="fa fa-star"></i>')
        }
        if (decimal < 0.5) {
            $(".review__details__rating").prepend('<i class="fa fa-star-half-o"></i>')
        }
        for (let i = 0; i < integer; i++) {
            $(".review__details__rating").prepend('<i class="fa fa-star"></i>')
        }
    }
    useEffect(() => {

    },[])
    return (
        <div>
            <h6>{review.mid} <i className="fa fa-star" style={{color: '#EDBB0E'}}></i><input type={"number"} min={0} max={5} value={grade} style={{width: '35px'}} onChange={handleGrade} /></h6>
            <TextAreaP value={text} rows={1}/>
        </div>
    );
};

export default Review;

