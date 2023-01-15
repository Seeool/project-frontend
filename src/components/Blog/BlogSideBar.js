import React from 'react';

function BlogSideBar(props) {
    return (
        <div className="col-lg-4 col-md-5">
            <div className="blog__sidebar">
                <div className="blog__sidebar__search">
                    <form action="src/components#">
                        <input type="text" placeholder="Search..."/>
                        <button type="submit">
                            <span className="icon_search"></span>
                        </button>
                    </form>
                </div>
                <div className="blog__sidebar__item">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="src/components#">All</a></li>
                        <li><a href="src/components#">Beauty (20)</a></li>
                        <li><a href="src/components#">Food (5)</a></li>
                        <li><a href="src/components#">Life Style (9)</a></li>
                        <li><a href="src/components#">Travel (10)</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BlogSideBar;