import React, {useEffect, useRef} from 'react';
import $ from "jquery";

const Review = (props) => {
    const {review} = props
    const starring = useRef()

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
            <h6>{review.mid} <i className="fa fa-star" style={{color: '#EDBB0E'}}></i>{review.grade}</h6>
            <p>{review.text}</p>
        </div>
    );
};

export default Review;
