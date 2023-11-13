import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const Board = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate  = useNavigate();

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
                                    카테고리
                                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div id="dropdownAction" className={`absolute z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">공지사항</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">회고록</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">자료공유</a>
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
                                    <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="검색어를 입력해주세요." />
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
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            글번호
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">카테고리</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        글 제목
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            작성자
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">작성일</div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            글번호
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">카테고리</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        글 제목
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            작성자
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">작성일</div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            글번호
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">카테고리</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        글 제목
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            작성자
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">작성일</div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            글번호
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">카테고리</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        글 제목
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            작성자
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">작성일</div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            글번호
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">카테고리</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        글 제목
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            작성자
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">작성일</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='mt-10 flex justify-center'>
                <nav aria-label="Page navigation example">
                    <ul class="list-style-none flex">
                        <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                            >1</a
                            >
                        </li>
                        <li aria-current="page">
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                            >2</a
                            >
                        </li>
                        <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                            >3</a
                            >
                        </li>
                        <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                aria-label="Next"
                            ><span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Board;