import React, { useState, useEffect, useContext } from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const ApplyStatus = () => {

    const { study_id, user_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        userId: "",
        username: "",
        email: "",
        essay: ""
    });

    {/** 페이지네이션 **/ }
    const [pageButtons, setPageButtons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const itemsPerPage = 5;
    const totalItems = applications.length; // useEffect 밖으로 이동

    useEffect(() => {
        let buttons = [];
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <li key={i}>
                    <a href="#"
                        className="relative block rounded bg-transparent px-0.5 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white mx-2" // Add margin here
                        onClick={(event) => {
                            event.preventDefault();
                            setCurrentPage(i);
                        }}>
                        {i}
                    </a>
                </li>
            );
        }
        setPageButtons(buttons);
    }, [applications]); // 의존성 배열에 applications 추가

    // 페이지 별 아이템 출력 로직
    const currentItems = applications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    {/** 페이지네이션 **/ }


    useEffect(() => {

        const fetchapplications = async () => {
            try {
                const response = await axios.get(`/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                setApplications(response.data.data);

            } catch (error) {
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
            const response = await axios.get(`/api/v1/study-groups/${study_id}/applications/${application.userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setSelectedUser(prevUser => ({ ...prevUser, essay: response.data.data.essay }));

        } catch (error) {
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser("");
    };

    // 승인
    const handleApproval = async () => {
        setLoading(true);
        try {

            const response = await axios.post(`/api/v1/study-member/${study_id}/${selectedUser.userId}`, {
                status: "Approved"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setSelectedUser(response.data.data);
            handleCloseModal();

            // 승인 후에 신청 목록 다시 불러오기
            try {
                const fetchResponse = await axios.get(`/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                window.location.reload(true);

            } catch (error) {
            }

        } catch (error) {
        }
    };



    // 거절
    const handleRejection = async () => {
        try {
            const response = await axios.post(`/api/v1/study-member/${study_id}/${selectedUser.userId}`, {
                status: "Rejected"
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
            setSelectedUser(response.data.data);
            handleCloseModal();

            // 거절된 사용자를 신청 목록에서 제거
            setApplications(applications.filter(app => app.userId !== selectedUser.userId));

            // 거절 후에 신청 목록 다시 불러오기
            try {
                const fetchResponse = await axios.get(`/api/v1/study-groups/${study_id}/applications`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                window.location.reload(true);

            } catch (error) {
            }

        } catch (error) {
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
                                {currentItems.map((application, index) => (
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
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                    aria-label="Previous"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {pageButtons}
                            <li>
                                <a
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                    aria-label="Next"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >

            {/* Modal Form */}
            {modalOpen && selectedUser && (
                <div className="modal-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '0%', left: '0%', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', height: '30%' }}>
                        <div className="modal-content" style={{ flex: 1, backgroundColor: 'white', padding: '20px', marginBottom: '10px' }}>
                            <div style={{ border: '1px solid black', padding: '10px', margin: '5px 0' }}>
                                <p><strong>User:</strong> {selectedUser.username}</p>
                            </div>
                            <div style={{ border: '1px solid black', padding: '10px', margin: '5px 0' }}>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                            </div>
                            <div style={{ border: '1px solid black', padding: '10px', margin: '5px 0' }}>
                                <p><strong>Essay:</strong> {selectedUser.essay}</p>
                            </div>
                        </div>
                        {loading && (
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        )}
                        <div className="flex items-center justify-center mt-2">
                            <button className="bg-blue-500 text-white ml-2 px-2 py-1 w-16"
                                onClick={handleCloseModal}>닫기
                            </button>
                            <button
                                className="bg-green-500 text-white ml-2 px-2 py-1 w-16"
                                onClick={() => handleApproval(selectedUser)}>승인
                            </button>
                            <button
                                className="bg-red-500 text-white ml-2 px-2 py-1 w-16"
                                onClick={() => handleRejection(selectedUser)}>거절
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ApplyStatus;