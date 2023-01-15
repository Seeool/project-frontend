import React from 'react';

function Product(props) {
    const {picUrl, name, price} = props.product
    //useParams를 이용해 페이지처리??
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div
                    className="product__item__pic set-bg"
                    data-setbg={picUrl}
                >
                    <ul className="product__item__pic__hover">
                        <li>
                            <a href="src/components#"><i className="fa fa-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="product__item__text">
                    <h6><a href="src/components#">{name}</a></h6>
                    <h5>{price}</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;