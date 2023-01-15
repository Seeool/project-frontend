import React from 'react';

function BlogPagination(props) {
    return (
        <div className="col-lg-12">
            <div className="product__pagination blog__pagination">
                <a href="src/components/Blog/BlogList#">1</a>
                <a href="src/components/Blog/BlogList#">2</a>
                <a href="src/components/Blog/BlogList#">3</a>
                <a href="src/components/Blog/BlogList#"><i className="fa fa-long-arrow-right"></i></a>
            </div>
        </div>
    );
}

export default BlogPagination;