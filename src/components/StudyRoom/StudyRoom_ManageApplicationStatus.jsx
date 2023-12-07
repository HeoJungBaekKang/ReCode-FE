import React, { useState, useEffect, useContext } from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import Essay from "../Mypage/Essay";

const ApplyStatus = () => {

    const { study_id, user_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {

        const fetchapplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("API 응답:", response.data);
                setApplications(response.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchapplications();
    }, [study_id]);


    const handleUserNameClick = async (user) => {
        console.log("user_id", user.user_id);
        setSelectedUser(user);
        setModalOpen(true);

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/study-groups/${study_id}/applications/${user.user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setSelectedUser(response.data.data);

        } catch (error) {
            console.error("에세이를 가져오는 중 오류 발생:", error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser("");
    };

    // 승인 / 거절 버튼
    const handleApproval = async (user, isApproved) => {
        try {
            
            const response = await axios.post(
                `http://localhost:8080/api/v1/study-member/${study_id}/${user.user_id}`,
                { isApproved },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                }
            );
    
            console.log(response.data);
            handleCloseModal();
        } catch (error) {
            console.error("가입 승인 또는 거절 중 오류 발생:", error);
        }
    };

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
                                {applications.map((application, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-20 p-4">
                                            <div className="flex items-center">{index + 1}</div>
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="pl-3">
                                                <a href="#" onClick={() => handleUserNameClick(application)}>
                                                    {application.username}
                                                </a>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{application.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <div className='mt-10 flex justify-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none flex">
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
            </div >

            {/* 모달 폼 */}
            {modalOpen && selectedUser && (
                <div className="modal-overlay ml-80 mr-80">
                    <div className="modal-content">
                        <p>유저: {selectedUser.username}</p>
                        <p>Email: {selectedUser.email}</p>
                        <p>에세이: {selectedUser.essay}</p>
                        <button onClick={handleCloseModal}>닫기</button>

                        {/* Approve and Reject Buttons */}
                        <div className="mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 mr-2"
                                onClick={() => handleApproval(selectedUser.user_id, true)}
                            >
                                승인
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleApproval(selectedUser.user_id, false)}
                            >
                                거절
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ApplyStatus;