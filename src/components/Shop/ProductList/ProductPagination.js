import React from 'react';

function ProductPagination(props) {
    //useParams를 이용해 페이지처리??
    return (
        <div className="product__pagination">
            <a href="src/components#">1</a>
            <a href="src/components#">2</a>
            <a href="src/components#">3</a>
            <a href="src/components#"><i className="fa fa-long-arrow-right"></i></a>
        </div>
    );
}

export default ProductPagination;