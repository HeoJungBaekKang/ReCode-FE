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
                        navigate("/mypage/myprofile");
                    } else {
                    }
                });
        } catch (error) {
        }
    };


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

                    const code = response.data.code;

                    if (code === 1) {
                    } else {
                    }
                });
        } catch (error) {
        }
    };

    useEffect(() => {
        handleGet(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
    }, []);

    const handleCancel = () => {
        navigate('/mypage/myprofile');
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen mt-[-5rem]">
                <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">자소서</h5>
                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">자신의 대해 소개해주세요.</label>
                    <textarea
                        id="essay"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={essay.essay || ''} // 상태를 연결합니다.
                        onChange={(e) => setEssay({ ...essay, essay: e.target.value })}
                    ></textarea>
                    <br />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
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
                    </div>
                </div>
            </div>
        </>
    );
}