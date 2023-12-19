import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Email() {
    const { authData } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async () => {
        setLoading(true);
        let url, headers = {};
        // 로그인 사용자의 경우 헤더에 Bearer 토큰 요청
        if (authData && authData.token) {
            url = `/api/v1/send-email?email=${encodeURIComponent(email)}`;
            headers.Authorization = `Bearer ${authData.token}`;
        } else {
            url = `/api/send-email?email=${encodeURIComponent(email)}`;
        }
        try {
            const response = await axios.post(url, {}, { headers });
            const code = response.data.code;
            if (code === 1) {
                setLoading(false);
                alert("이메일이 전송되었습니다. 입력하신 이메일을 확인해주세요.")
            } else {
                alert("등록되지 않은 이메일입니다.");
            }
        } catch (error) {
        }
    };
    const checkEmailExist = async () => {
        try {
            const response = await axios.get(`/api/user-email/${email}/exists`);
            if (response.data.code === 1) {
                return null;
            } else if (response.data.code === -1) {
                return response.data.code;
            }
        } catch (error) {
            alert("유효하지 않은 이메일입니다.");
            return null;
        }
    }
    const handleOnClick = async () => {
        const emailExists = await checkEmailExist();
        if (emailExists === -1) {
            await handleSubmit();
        } else {
            alert("등록되지 않은 이메일입니다. 가입하신 이메일을 입력해주세요.");
        }
    };
    const onCancle = () => {
        navigate(-1);
    }
    return (
        <div className="flex justify-center items-center h-screen mt-[-5rem]">
            <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recode</h3>
                    {loading && (
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                    )}
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
                            onClick={onCancle}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            onClick={handleOnClick}
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









