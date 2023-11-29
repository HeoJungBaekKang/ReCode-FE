import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from 'axios';

export default function Board() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('카테고리');
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);
    const { study_room_id } = useParams();

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState(null);

    const [currentPage, setCurrentPage] = useState(0)

    const [posts, setPost] = useState([]);

    const handleGet = async () => {
        try {
            let url = `http://52.79.108.89:8080/api/v1/study/${study_id}/list`;
            if (keyword) {
                url += `?keyword=${keyword}`;
            }
            if (category !== null) { // 카테고리가 설정된 경우에만 카테고리를 요청에 포함
                const separator = keyword ? '&' : '?';
                url += `${separator}category=${category}`;
            }
            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    setPost(response.data.data || []);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("게시글 목록 조회 성공");
                    } else {
                        console.log("게시글 목록 조회 실패");
                    }
                });
        } catch (error) {
            console.error("게시글 목록 조회 중 오류 발생 : ", error);
            console.log(error.response);
        }
    }
    
    const handleCategoryChange = (category) => {
        setCurrentCategory(category || '카테고리');
        let categoryNumber;
        switch (category) {
            case '공지사항':
                categoryNumber = 0;
                break;
            case '회고록':
                categoryNumber = 1;
                break;
            case '자료공유':
                categoryNumber = 2;
                break;
            default:
                categoryNumber = null;
        }
        setCategory(categoryNumber);
        handleGet(); // 카테고리가 변경될 때마다 handleGet 호출
    }

    const chunkedPosts = chunk(posts, 10)

    useEffect(() => {
        handleGet(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
    }, [keyword, category]);

    return (
        <>
            <StudyRoom_Sidebar />
            <div className='ml-60'>
                <div className='ml-5'>
                    <div className="relative flex-grow overflow-x-auto shadow-md sm:rounded-lg ml-5 mr-5">
                        <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 ml-3">
                            <div>
                                <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}>
                                    <span className="sr-only">Action button</span>
                                    {currentCategory}
                                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div id="dropdownAction" className={`absolute z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-2`}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 mt-2" aria-labelledby="dropdownActionButton">
                                        <li>
                                            <button className="block px-4 py-2 bg-transparent border-0 text-black hover:bg-transparent dark:hover:bg-transparent dark:hover:text-black" onClick={() => handleCategoryChange('공지사항')}>공지사항</button>
                                        </li>
                                        <li>
                                            <button className="block px-4 py-2 bg-transparent border-0 text-black hover:bg-transparent dark:hover:bg-transparent dark:hover:text-black" onClick={() => handleCategoryChange('회고록')}>회고록</button>
                                        </li>
                                        <li>
                                            <button className="block px-4 py-2 bg-transparent border-0 text-black hover:bg-transparent dark:hover:bg-transparent dark:hover:text-black" onClick={() => handleCategoryChange('자료공유')}>자료공유</button>
                                        </li>
                                        <li>
                                            <button className="block px-4 py-2 bg-transparent border-0 text-black hover:bg-transparent dark:hover:bg-transparent dark:hover:text-black" onClick={() => handleCategoryChange(null)}>전체보기</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => navigate('/studyroom/post')} className="text-gray-900 bg-white border border-gray-300 border-5 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    글 작성
                                </button>
                                <label for="table-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <SearchBox keyword={keyword} setKeyword={setKeyword} />
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="w-20 p-4">
                                        글 번호
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        카테고리
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        제목
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        작성자
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        작성일
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {chunkedPosts && chunkedPosts[currentPage] && chunkedPosts[currentPage].map((post, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-20 p-4">
                                            <div className="flex items-center">
                                                {post.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.nickname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.createdAt}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul className="list-style-none flex">
                        <li key="previous-button">
                            <button
                                disabled={currentPage === 0}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                            >
                                Previous
                            </button>
                        </li>
                        {chunkedPosts.map((_, index) => (
                            <li key={`page-button-${index}`}>
                                <button
                                    onClick={() => setCurrentPage(index)}
                                    className={`relative block rounded px-3 py-1.5 text-sm ${index === currentPage ? 'text-neutral-50 bg-blue-200' : 'text-neutral-600'} transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li key="next-button">
                            <button
                                disabled={currentPage === chunkedPosts.length - 1}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedPosts.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

function chunk(array, size) {
    const chunked_arr = []
    let copied = [...array]

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size))
    }

    return chunked_arr
}

function SearchBox({ keyword, setKeyword }) {

    const { authData } = useContext(AuthContext);
    const { study_id } = useParams();

    const [results, setResults] = useState([]);

    useEffect(() => {
        if (keyword) {
            axios.get(`http://52.79.108.89:8080/api/v1/study/${study_id}/list?keyword=${keyword}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    setResults(response.data.data || []);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setResults([]);
                });
        } else {
            setResults([]);
        }
    }, [keyword]);

    const handleInputChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={handleInputChange}
        />
    );
}