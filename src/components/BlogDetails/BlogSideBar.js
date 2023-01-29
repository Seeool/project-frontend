import React, {createRef, useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

function BlogSideBar(props) {
    const [params, setParams] = useSearchParams()
    const refs = Array.from({ length: 5 }).map(() => createRef());
    let categoryName = params.get('category')

    useEffect(() => {
        refs.map(ref => {
            ref.current.classList.remove('active')
        })
        if(categoryName === null) {
            refs[4]?.current.classList.add('active')
        }
        refs[categoryName]?.current.classList.add('active')
    }, [params])


    const [all, setAll] = useState(0);
    const [beauty, setBeauty] = useState(0);
    const [food, setFood] = useState(0);
    const [life, setLife] = useState(0);
    const [travel, setTravel] = useState(0);
    const [keyword, setKeyword] = useState('');
    const handleWord = (e) => {
        setKeyword(e.target.value)
    }

    const navigate = useNavigate()
    const enterPress = e => {
        let category = params.get('category')
        if (category === null) {category = ''}
        if (e.key === 'Enter') {
            navigate("/blog?category="+category+"&keyword="+keyword)
        }
    };
    const search = (e) => {
        e.preventDefault()
        let category = params.get('category')
        if (category === null) {category = ''}
        navigate("/blog?category="+category+"&keyword="+keyword)
    }
    const getBlogCountByCategory = async () => {
        try {
            const response = await axios.get(`http://seol.site:9000/api/blog/count`)
            setAll(response.data)

            let array = []
            for (let i = 0; i < 4; i++) {
                const response = await axios.get(`http://seol.site:9000/api/blog/count/${i}`)
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
                    <form>
                        <input type="text" placeholder="블로그 검색" value={keyword} onChange={handleWord} onKeyDown={enterPress}/>
                        <button onClick={search}>
                            <span className="icon_search"></span>
                        </button>
                    </form>
                </div>
                <div className="blog__sidebar__item">
                    <h4>카테고리</h4>
                    <ul>
                        <li ref={refs[4]}><Link to="/blog">전체 ({all})</Link></li>
                        <li ref={refs[0]}><Link to="/blog?category=0">뷰티 ({beauty})</Link></li>
                        <li ref={refs[1]}><Link to="/blog?category=1">음식 ({food})</Link></li>
                        <li ref={refs[2]}><Link to="/blog?category=2">생활/건강 ({life})</Link></li>
                        <li ref={refs[3]}><Link to="/blog?category=3">여행 ({travel})</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BlogSideBar;