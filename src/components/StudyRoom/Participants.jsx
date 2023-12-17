import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { UserMinusIcon } from "@heroicons/react/24/outline";
import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

export default function Participants() {

    const navigate = useNavigate();

    const { study_id, member_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const [info, setInfo] = useState({
        username: "",
        masterNickname: ""
    })

    // 사용자 데이터 가져오기
    useEffect(() => {

        const fetchData = async () => {
            console.log("유저정보", users);
            try {
                const response = await axios.get(`/api/v1/study/${study_id}/memberlist`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("스터디룸 인원 목록을 가져오는데 성공:", response.data);
                setUsers(response.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [study_id]);

    // 멤버 내보내기
    const handleLeaveStudy = async (member_id) => {
        try {
            const response = await axios.delete(
                `/api/v1/${study_id}/member/${member_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                }
            );

            // 탈퇴 성공 시 사용자 목록 업데이트
            setUsers(prevUsers => prevUsers.filter(user => user.id !== member_id));

            console.log("탈퇴 성공:", response.data);
        } catch (error) {
            console.error("탈퇴 중 오류 발생:", error);
        }
    };

    const checkMaster = async () => {
        try {
            await axios.get(`/api/v1/study/${study_id}/check-master`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("해당 스터디의 조장입니다 : ", response.data.data);
                        setInfo({ ...info, username: response.data.data.username });
                    } else {
                        console.log("해당 스터디의 조장이 아닙니다 :", response.data);
                    }
                });
        } catch (error) {
            console.log("스터디 조장인지 체크 중 오류 발생 :", error.response);
        }
    };

    useEffect(() => {
        if (study_id) {
            console.log("Study Room ID: ", study_id);
            checkMaster();
        } else {
            console.log("Study Room ID Not found");
        }
    }, [study_id])


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
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
                                        {users.map((user, index) => (
                                            <tr
                                                key={user.id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                <td
                                                    className="whitespace-nowrap px-6 py-4">{user.nickname}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Tooltip content="내보내기">
                                                        <IconButton variant="text" onClick={() => handleLeaveStudy(user.id)}>
                                                            <UserMinusIcon className="h-4 w-4 " />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        ))}
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