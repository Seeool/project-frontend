import React, {useEffect, useState} from 'react';
import axios from "axios";

function BlogSideBar(props) {
    const [all, setAll] = useState(0);
    const [beauty, setBeauty] = useState(0);
    const [food, setFood] = useState(0);
    const [life, setLife] = useState(0);
    const [travel, setTravel] = useState(0);
    const getBlogCountByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/blog/count`)
            setAll(response.data)

            let array = []
            for (let i = 0; i < 4; i++) {
                const response = await axios.get(`http://localhost:9000/api/blog/count/${i}`)
                array.push(response.data)
            }
            setBeauty(array[0])
            setFood(array[1])
            setLife(array[2])
            setTravel(array[3])
        }catch (e) {
            alert(e)
        }

    }

    useEffect(() => {
        getBlogCountByCategory()
    },[])
    return (
        <div className="col-lg-4 col-md-5">
            <div className="blog__sidebar">
                <div className="blog__sidebar__search">
                    <form action="src/components#">
                        <input type="text" placeholder="블로그 검색"/>
                        <button type="submit">
                            <span className="icon_search"></span>
                        </button>
                    </form>
                </div>
                <div className="blog__sidebar__item">
                    <h4>카테고리</h4>
                    <ul>
                        <li><a href="src/components#">전체 ({all})</a></li>
                        <li><a href="src/components#">뷰티 ({beauty})</a></li>
                        <li><a href="src/components#">음식 ({food})</a></li>
                        <li><a href="src/components#">생활/건강 ({life})</a></li>
                        <li><a href="src/components#">여행 ({travel})</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BlogSideBar;