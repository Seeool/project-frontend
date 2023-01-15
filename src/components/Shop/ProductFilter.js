import React from 'react';

function ProductFilter(props) {
    return (
        <div className="filter__item">
            <div className="row">
                <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                        <span>Sort By</span>
                        <select>
                            <option value="0">인기</option>
                            <option value="1">가격(오름차순)</option>
                            <option value="1">가격(내림차순)</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                        <h6><span>16</span> 개의 상품이 있습니다.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFilter;