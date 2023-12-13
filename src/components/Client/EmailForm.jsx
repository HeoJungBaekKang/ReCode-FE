import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

export default function Email() {

    const { authData } = useContext(AuthContext);
    const [email, setEmail] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        let url, headers = {};

        // 로그인 사용자의 경우 헤더에 Bearer 토큰 요청
        if (authData && authData.token) {
            url = `http://52.79.108.89:8080/api/v1/send-email?email=${encodeURIComponent(email)}`;
            headers.Authorization = `Bearer ${authData.token}`;
        } else {
            url = `http://52.79.108.89:8080/api/send-email?email=${encodeURIComponent(email)}`;
        }

        try {
            const response = await axios.post(url, {}, { headers });
            const code = response.data.code;

            if (code === 1) {
                console.log("이메일 전송 성공");
                alert("이메일이 전송되었습니다. 입력하신 이메일을 확인해주세요.")
            } else {
                console.log("이메일 전송 실패");
            }
        } catch (error) {
            console.error("이메일 전송 중 오류 발생: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen mt-[-5rem]">
            <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recode</h3>
                    <br />
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">이메일 인증</h5>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">본인 확인을 위해 이메일 인증을 진행합니다. </label>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                required
                            />
                            <label
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                            >
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            이메일 전송
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
