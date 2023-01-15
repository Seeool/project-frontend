import React from 'react';

function ProductDescription(props) {
    return (
        <div className="col-lg-12">
            <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        제품 설명
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                        <div className="product__details__tab__desc">
                            <h6>Products Infomation</h6>
                            <p>제품 설명 글</p>
                        </div>
                    </div>
                </div>

                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        리뷰
                    </li>
                </ul>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <div className="product__details__tab__desc">
                        <h6>작성자 이름</h6>
                        <p>리뷰 글</p>
                        <br/>
                        <h6>작성자 이름</h6>
                        <p>리뷰 글</p>
                        <br/>
                        <h6>작성자 이름</h6>
                        <p>리뷰 글</p>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription;