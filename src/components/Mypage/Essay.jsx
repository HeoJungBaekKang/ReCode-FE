import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Essay() {
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);

    const [essay, setEssay] = useState({
        essay: "",
    });

    /*
        글자 수 측정
    */
    const [textCount, setTextCount] = useState(0);

    const updateTextCount = (text) => {
        setTextCount(text.length);
    };

    /*
        수정 버튼을 눌렀을 때 수정이 가능한 환경으로 변경되도록
    */
    const [editMode, setEditMode] = useState(false);

    /*
        입력 데이터 저장
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/v1/mypage/${authData.id}/essay`, essay, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    const code = response.data.code;

                    if (code === 1) {
                        setEditMode(false); // 수정 환경 종료
                        navigate("/mypage/myprofile");
                    } else {
                    }
                });
        } catch (error) {
        }
    };

    /*
        자소서 데이터 불러오기
    */
    const handleGet = async () => {
        try {
            await axios.get(`/api/v1/mypage/${authData.id}/getessay`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    setEssay({ essay: response.data.data.essay || '' }); // 가져온 데이터로 essay 상태를 업데이트
                    updateTextCount(response.data.data.essay || '');
                    const code = response.data.code;

                    if (code === 1) {
                    } else {
                    }
                });
        } catch (error) {
        }
    };

    /*
        페이지가 처음 렌더링될 때 handleGet함수를 실행
    */
    useEffect(() => {
        handleGet();
    }, []);

    /*
        취소 버튼을 눌렀을 때 이전 페이지로 이동
    */
    const handleGoBack = () => {
        navigate('/mypage/myprofile');
    }

    /*
        수정 환경으로 변경
    */
    const handleEdit = () => {
        setEditMode(true);
    }

    /*
        수정 환경 나가기
    */
    const handleExitEdit = () => {
        setEditMode(false);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen mt-[-5rem]">
                <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">자기 소개서</h5>
                        <div className="flex justify-end">
                            <img
                                src="/img/backward.png"
                                alt="Backward"
                                className={`absolute top-4 right-4 cursor-pointer h-4 text-gray-500`}
                                onClick={handleGoBack}
                            />
                        </div>
                    </div>
                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">자신의 대해 소개해주세요.</label>
                    <label for="message" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">(신청한 스터디의 스터디장에게 노출됩니다)</label>
                    <textarea
                        id="essay"
                        rows="14"
                        readOnly={!editMode}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                        value={essay.essay || ''} // 상태를 연결합니다.
                        onChange={(e) => {
                            const inputText = e.target.value;
                            if (inputText.length <= 500) {
                                setEssay({ ...essay, essay: inputText }); // 자소서 내용을 저장
                                updateTextCount(inputText); // 글자 수 측정
                            }
                        }}
                    ></textarea>
                    <div className={`flex justify-end text-sm ${textCount > 500 ? 'text-red-500' : 'text-gray-500'} mt-2`}>
                        글자수: {textCount} / 500
                    </div>
                    <br />
                    <div className="flex justify-end space-x-4">
                        {editMode ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleExitEdit}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    완료
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                수정
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}