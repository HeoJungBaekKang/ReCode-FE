import React from "react";
import { useNavigate } from 'react-router-dom';
import { UserMinusIcon } from "@heroicons/react/24/outline";
import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

export default function Participants() {

    const navigate = useNavigate();

    return (
        <>
            <StudyRoom_Sidebar />
            <div className="ml-56">
                <div className="ml-3 text-4xl">스터디 참가 인원</div>
                <div className="flex items-center justify-end py-4 bg-white dark:bg-gray-800 mr-5">
                    <div className="flex items-center">
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="참가 인원 찾기" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">이름</th>
                                            <th scope="col" className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                            <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Tooltip content="Out User">
                                                    <IconButton variant="text">
                                                        <UserMinusIcon className="h-4 w-4 " />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                        <tr
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Tooltip content="Out User">
                                                    <IconButton variant="text">
                                                        <UserMinusIcon className="h-4 w-4 " />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                        <tr
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                            <td className="whitespace-nowrap px-6 py-4">Larry</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Tooltip content="Out User">
                                                    <IconButton variant="text">
                                                        <UserMinusIcon className="h-4 w-4 " />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}