import React, { useState, useEffect, useContext } from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const ApplyStatus = () => {

    const { study_id, user_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        userId: "",
        username: "",
        email: "",
        essay: ""
    });

    useEffect(() => {

        const fetchapplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("신청 정보를 가져오는데 성공:", response.data);
                setApplications(response.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchapplications();
    }, [study_id]);


    const handleUserNameClick = async (application) => {
        setSelectedUser({
            userId: application.userId,
            username: application.username,
            email: application.email,
        });
        setModalOpen(true);

        try {
            const response = await axios.get(`http://localhost:8081/api/v1/study-groups/${study_id}/applications/${application.userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setSelectedUser(prevUser => ({ ...prevUser, essay: response.data.data.essay }));
            console.log("유저정보", application);
            console.log("에세이 조회 성공", response.data);

        } catch (error) {
            console.error("에세이를 가져오는 중 오류 발생:", error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser("");
    };

    // 승인
    const handleApproval = async () => {

        console.log("버튼 클릭", selectedUser);
        try {

            const response = await axios.post(`http://localhost:8081/api/v1/study-member/${study_id}/${selectedUser.userId}`, {
                status: "Approved"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setSelectedUser(response.data.data);
            console.log("승인 성공", response.data);
            handleCloseModal();

            // 승인 후에 신청 목록 다시 불러오기
            try {
                const fetchResponse = await axios.get(`http://localhost:8081/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("신청 정보를 가져오는데 성공:", fetchResponse.data);
                setApplications(fetchResponse.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }

        } catch (error) {
            console.error("가입 승인 또는 거절 중 오류 발생:", error);
        }
    };

    // 거절
    const handleRejection = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/v1/study-member/${study_id}/${selectedUser.userId}`, {
                status: "Rejected"
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
            setSelectedUser(response.data.data);
            console.log("거절 성공", response.data);
            handleCloseModal();

            // 거절된 사용자를 신청 목록에서 제거
            setApplications(applications.filter(app => app.userId !== selectedUser.userId));

            // 거절 후에 신청 목록 다시 불러오기
            try {
                const fetchResponse = await axios.get(`http://localhost:8081/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("신청 정보를 가져오는데 성공:", fetchResponse.data);
                setApplications(fetchResponse.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }

        } catch (error) {
            console.error("가입 거절 중 오류 발생:", error);
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

            {/* Modal Form */}
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
                                onClick={() => handleApproval(selectedUser)}
                            >
                                승인
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleRejection(selectedUser)}
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