import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from "axios";

const Quiz = () => {
    const { authData } = useContext(AuthContext);
    const { study_room_id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [quizzes, setQuizzes] = useState([]);

    const handleGet = async () => {
        if (!study_room_id) {
            console.error("Study Room ID undefined");
            return;
        }

        try {
            await axios.get(`http://localhost:8081/api/v1/study/${study_room_id}/quiz-list`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("퀴즈 목록 불러오기 성공");
                    } else {
                        console.log("퀴즈 목록 불러오기 실패");
                    }
                });
        } catch (error) {
            console.error("퀴즈 목록 불러오는 중 오류 발생 : ", error.response);
        }
    }

    useEffect(() => {
        console.log("Study Room ID:", study_room_id);
        handleGet();
    }, [study_room_id])

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTitle("");
        setContent("");
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleWriteComplete = () => {
        // 작성 완료 버튼을 눌렀을 때 수행해야 하는 작업 추가
        // 예: 서버에 제목과 내용을 전송하고 모달을 닫는 등의 동작
        console.log("제목:", title);
        console.log("내용:", content);
        closeModal();
    };

    return (
        <>
            <StudyRoom_Sidebar />
            <div className="flex mx-auto p-4">
                <label className="block text-3xl font-semibold mb-8 px-80">QUIZ</label>
            </div>
            <div className='ml-60'>
                <div className='ml-5'>
                    <div className="relative flex-grow overflow-x-auto shadow-md sm:rounded-lg ml-5 mr-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="w-20 p-4">
                                        글 번호
                                    </th>
                                    <th scope="col" className="px-10 py-3">
                                        제목
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        난이도
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        닉네임
                                    </th>
                                    <th scope="col" className="px-12 py-3">
                                        Link
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        작성일
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map(quiz => (
                                    <tr key={quiz.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-20 p-4">
                                            <div className="flex items-center ml-4">
                                                {quiz.id}
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{quiz.title}</div>
                                            </div>
                                        </th>
                                        <td className="w-20 p-4">
                                            <div className="flex items-center ml-4">
                                                {quiz.difficulty}
                                            </div>
                                        </td>
                                        <td className="w-20 p-4">
                                            <div className="flex items-center ml-4">
                                                {quiz.nickname}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={quiz.quiz_link} target="_blank" rel="noopener noreferrer">
                                                {quiz.quiz_link}
                                            </a>
                                        </td>
                                        <td className="w-20 p-4">
                                            <div className="flex items-center ml-4">
                                                {quiz.created_At}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* 모달 오픈 버튼 */}
                        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                            글 작성
                        </button>
                    </div>
                </div>
            </div>
            {/* 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">글 작성 모달</h2>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full border p-2 mb-4"
                        />
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            내용
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            className="w-full border p-2 mb-4"
                        ></textarea>
                        <button
                            onClick={handleWriteComplete}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            작성 완료
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded ml-2"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Quiz;