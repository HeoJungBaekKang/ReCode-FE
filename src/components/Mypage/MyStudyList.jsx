import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import axios from "axios";

export default function MyStudyList() {

    const navigate = useNavigate();

    const { authData } = useContext(AuthContext);
    const { user_id } = useParams();

    const [currentPage, setCurrentPage] = useState(0)

    const [posts, setPost] = useState([]);

    const handleGet = async () => {
        try {
            await axios.get(`http://52.79.108.89:8080/api/v1/users/${user_id}/study-applications`, {
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
                        console.log("가입한 스터디 목록 불러오기 성공");
                    } else {
                        console.log("가입한 스터디 목록 불러오기 실패")
                    }
                });
        } catch (error) {
            console.error("참가 중인 스터디 목록 조회 중 오류 : ", error);
            console.log(error.response);
        }
    }

    const chunkedPosts = chunk(posts, 9)

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className="bg-white py-24 sm:py-5">
            <div className="mx-auto max-w-9xl px-6 lg:px-8">
                <div className="mx-auto mt-10m gap-y-4 gap-x-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-3 grid-flow-row-dense">
                    {chunkedPosts && chunkedPosts[currentPage] && chunkedPosts[currentPage].map((post, index) => (
                        <article key={index} className="flex max-w-xl flex-col items-start justify-between border-2 border-gray-200 p-4 rounded-md">
                            <div className="flex items-center gap-x-4 text-xs">
                                <div className="text-gray-500">
                                    {post.study_name}
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full ${post.status === '거절됨' ? 'bg-red-400 text-white' :
                                    post.status === '대기중' ? 'bg-gray-400 text-white' :
                                        'bg-green-400 text-white'
                                    }`}>
                                    {post.status}
                                </div>
                                <div className="flex justify-end flex-grow">
                                    <Tooltip content="Remove">
                                        <IconButton variant="text" onClick={() => navigate('/')}>
                                            <UserMinusIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex items-start text-sm">
                                {post.skillNames.map((skill, index) => (
                                    <span key={index} style={{ marginRight: '10px' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="group relative">
                                <h3 className={`mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ${post.status === '거절됨' || post.status === '대기중' ? 'pointer-events-none' : ''}`}>
                                    {
                                        // 링크 활성화 여부를 status에 따라 결정
                                        post.status === '거절됨' || post.status === '대기중' ?
                                            (
                                                <span>{post.title}</span> // 클릭 불가능한 상태
                                            ) :
                                            (
                                                <a href={`/studyroom/${post.id}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </a>
                                            )
                                    }
                                </h3>
                            </div>
                        </article>
                    ))}
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
            </div>
        </div>
    )
}

function chunk(array, size) {
    const chunked_arr = []
    let copied = [...array]

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size))
    }

    return chunked_arr
}
