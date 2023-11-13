import React from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { Link } from 'react-router-dom';

const ApplicationStatus = () => {

    return (
        <>
            <StudyRoom_Sidebar />
            <div className='ml-60 mr-60'>
                <div className='ml-10'>
                    <div className="relative flex-grow overflow-x-auto shadow-md sm:rounded-lg ml-5 mr-5">

                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="w-20 p-4">
                                        번호
                                    </th>
                                    <th scope="col" className="px-12 py-3">
                                        이름
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        이메일
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            1
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">huno</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        huno@naver.com
                                    </td>
                                    <div>
                                        <Link to="/studyroom/applicationdetail/1"> 〉</Link>
                                    </div>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            2
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">김철수철수</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        Fe@gmail.com
                                    </td>
                                    <div>
                                        <Link to="/studyroom/applicationdetail/2"> 〉</Link>
                                    </div>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-20 p-4">
                                        <div className="flex items-center">
                                            3
                                        </div>
                                    </td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">json</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        json@naver.com
                                    </td>
                                    <div>
                                        <Link to="/studyroom/applicationdetail/3"> 〉</Link>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
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
                </div>
            </div >
        </>
    );
}

export default ApplicationStatus;