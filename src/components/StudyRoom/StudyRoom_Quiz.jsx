import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from "axios";

const Quiz = () => {
    const { authData } = useContext(AuthContext);
    const { study_id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isEditing, setIsEditing] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    // 새로운 퀴즈를 위한 상태 변수 추가
    const [quiz, setQuiz] = useState({
        title: "",
        difficulty: "",
        quiz_link: "",
        studyRoomId: study_id,
        userId: authData.id,
        updatedAt: ""
    })

    const handleGet = async () => {
        if (!study_id) {
            console.error("Study Room ID undefined");
            return;
        }

        try {
            let url = `/api/v1/study/${study_id}/quiz-list`;
            if (keyword) {
                url += `?keyword=${keyword}`;
            }

            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    const code = response.data.code;

                    setQuizzes(response.data.data || []);

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
        console.log("Study Room ID:", study_id);
        handleGet();
    }, [study_id, authData, keyword])

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleWriteComplete = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`/api/v1/study/${study_id}/quiz`, quiz, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    console.log(response.data.quiz);

                    const code = response.data.code;

                    console.log("퀴즈 전송 중 : ", quiz);

                    setQuiz({ quiz: response.data.data.quiz || '' });

                    if (code === 1) {
                        console.log("퀴즈 등록 성공", response.data);

                        closeModal();
                        handleGet();
                    } else {
                        console.log("퀴즈 등록 실패");
                    }
                });
        } catch (error) {
            console.log("퀴즈 등록 중 오류 발생 : ", error.response || error);
        }
    };

    const openDetailModal = () => {
        setDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setDetailModalOpen(false);
    };

    const handleDetail = async () => {
        try {
            await axios.get(`/api/v1/study/${study_id}/quiz/${authData.id}/detail`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("퀴즈 상세보기 성공 : ", response.data.data);
                        setQuiz(response.data.data);
                    } else {
                        console.log("퀴즈 상세보기 실패 :", response);
                    }
                });
        } catch (error) {
            console.log("퀴즈 상세보기 중 오류 발생 : ", error);
        }
    };

    // 수정 버튼 클릭 이벤트 핸들러
    const handleEditClick = () => {
        if (!isEditing) {
            setIsEditing(true);  // 수정 상태로 전환
        } else {
            handleModify();      // 수정 완료 상태에서는 수정 이벤트를 실행
            setIsEditing(false); // 수정 상태 종료
        }
    };

    const handleModify = async (event) => {
        try {
            await axios.post(`/api/v1/study/${study_id}/quiz/${quiz.id}/quiz-modify`, quiz, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("퀴즈 수정 성공 : ", quiz);

                        closeDetailModal();
                        handleGet();
                    } else {
                        console.log("퀴즈 수정 실패 :", response);
                    }
                });
        } catch (error) {
            console.log("퀴즈 수정 중 오류 발생 : ", error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/v1/study/${study_id}/quiz/${quiz.id}/delete`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("퀴즈 삭제 성공");

                        setQuizzes(response.data.data || []); // 리스트 갱신

                        closeDetailModal();
                    } else {
                        console.log("퀴즈 삭제 실패 :", response);
                    }
                });
        } catch (error) {
            console.log("퀴즈 삭제 중 오류 발생 : ", error);
        }
    };

    const chunkedQuizzes = chunk(quizzes, 10)

    return (
        <>
            <StudyRoom_Sidebar />
            <div className="flex mx-auto p-4">
                <label className="block text-3xl font-semibold mb-8 px-80">QUIZ</label>
            </div>
            <div className='ml-60'>
                {/* 모달 오픈 버튼 */}
                <div className="flex justify-end mr-5">
                    <a href="https://forms.google.com/" target="_blank" rel="noopener noreferrer" className="bg-transparent text-black w-30 p-2 rounded">
                        문제 만들기
                    </a>
                    <button onClick={openModal} className="bg-transparent text-black w-20 p-2 rounded hover:bg-transparent">
                        글 작성
                    </button>
                <SearchBox keyword={keyword} setKeyword={setKeyword} />
                </div>
                <div className='ml-5 mt-5'>
                    <div className="relative flex-grow overflow-x-auto shadow-md sm:rounded-lg ml-5 mr-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="w-32 p-5 whitespace-nowrap">
                                        글 번호
                                    </th>
                                    <th scope="col" className="px-10 py-3">
                                        제목
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        난이도
                                    </th>
                                    <th scope="col" className="pl-7 p-2">
                                        닉네임
                                    </th>
                                    <th scope="col" className="px-12 py-3">
                                        Link
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        작성일
                                    </th>
                                    <th scope="col" className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {chunkedQuizzes && chunkedQuizzes[currentPage] && chunkedQuizzes[currentPage].map((quiz, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-24 p-4 whitespace-nowrap">
                                            <div className="flex items-center ml-4">
                                                {quiz.id}
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center px-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="pl-3"
                                                style={{ cursor: quiz.nickname === authData.nickname ? 'pointer' : 'default' }}
                                                onClick={async () => {
                                                    if (quiz.nickname === authData.nickname) {
                                                        await handleDetail();
                                                        openDetailModal();
                                                    }
                                                }}>
                                                <div className="text-base font-semibold">{quiz.title}</div>
                                            </div>
                                        </th>
                                        <td className="w-20 p-4">
                                            <div className="flex items-center">
                                                <img src="https://i.ibb.co/r7CGcbr/star-emoji-clipart-md-removebg-preview.png" alt="star-emoji-clipart-md-removebg-preview" border="0"style={{ width: '20px', height: '20px' }}/>{quiz.difficulty}
                                            </div>
                                        </td>
                                        <td className="w-20 p-2">
                                            <div className="flex items-center ml-4">
                                                {quiz.nickname}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={quiz.quiz_link} target="_blank" rel="noopener noreferrer">
                                                
                                                {quiz.quiz_link}
                                            </a>
                                        </td>
                                        <td className="pl-2 p-4">
                                            <div className="flex items-center ml-4">
                                                {quiz.updatedAt}
                                            </div>
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
                        {chunkedQuizzes.map((_, index) => (
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
                                disabled={currentPage === chunkedQuizzes.length - 1}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedQuizzes.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* 퀴즈 작성 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">퀴즈 작성</h2>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            제목
                        </label>
                        <input
                            id="title"
                            value={quiz.title || ''}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                            className="w-full border p-2 mb-4"
                        />
                        <div className="">
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                                난이도
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={quiz.difficulty}
                                onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value })}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="0">난이도를 선택해주세요.</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <label htmlFor="quiz_link" className="block text-sm font-medium text-gray-700">
                            LINK
                        </label>
                        <textarea
                            id="quiz_link"
                            value={quiz.quiz_link || ''}
                            onChange={(e) => setQuiz({ ...quiz, quiz_link: e.target.value })}
                            className="w-full border p-2 mb-4"
                        ></textarea>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleWriteComplete}
                                className="bg-blue-500 text-white px-6 w-80 rounded"
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
                </div>
            )}
            {/* 상세보기 모달 */}
            {detailModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">퀴즈</h2><label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mt-2 mb-2">
                            작성자 : {quiz.nickname}
                        </label>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            제목
                        </label>
                        <input
                            id="title"
                            value={quiz.title || ''}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                            className="w-full border p-2 mb-4"
                            disabled={!isEditing}
                        />
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                            난이도
                        </label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={quiz.difficulty}
                            placeholder={quiz.difficulty}
                            onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value })}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            disabled={!isEditing}
                        >
                            <option value="0">{quiz.difficulty}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label htmlFor="quiz_link" className="block text-sm font-medium text-gray-700">
                            LINK
                        </label>
                        <textarea
                            id="quiz_link"
                            value={quiz.quiz_link || ''}
                            onChange={(e) => setQuiz({ ...quiz, quiz_link: e.target.value })}
                            className="w-full border p-2 mb-4"
                            disabled={!isEditing}
                        ></textarea>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                {isEditing ? '수정 완료' : '수정'}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-6 w-80 rounded"
                            >
                                삭제
                            </button>
                            <button
                                onClick={closeDetailModal}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded ml-2"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Quiz;

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
            axios.get(`/api/v1/study/${study_id}/quiz-list?keyword=${keyword}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    setResults(response.data.data || []);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error.response.data);
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