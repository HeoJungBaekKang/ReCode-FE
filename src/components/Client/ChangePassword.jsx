import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

export default function ChangePassword() {

    const { authData } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        const email = queryParams.get('email');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [location]);

    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error("비밀번호가 일치하지 않습니다.");
            return; // 비밀번호가 일치하지 않을 경우 함수 실행 중단
        }
        
        const url = authData && authData.token ?
        `http://localhost:8081/api/v1/change-password` :
        `http://localhost:8081/api/change-password`;
        
        const payload = {
            password: password
        };
        if (token) {
            payload.token = token; // URL 에 토큰이 있을 경우 가져옴
        }
        
        const headers = {};
        if (authData && authData.token) {
            headers.Authorization = `Bearer ${authData.token}`; // 토큰이 유효하면 헤더에 추가
        }
        
        try {
            const response = await axios.post(url, payload, { headers });
            const code = response.data.code;
            
            if (code === 1) {
                console.log("비밀번호 변경 성공");
                navigate('/login');
            } else {
                console.log("비밀번호 변경 실패");
                console.log(headers);
            }
        } catch (error) {
            console.error("비밀번호 변경 중 오류 발생 : ", error);
        }
    }

    const handleGet = async () => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        const email = queryParams.get('email');
    
        if (tokenFromUrl && email) {
            // 유저 로그인 여부
            const url = authData && authData.token ?
                `http://localhost:8081/api/v1/check-mail-token` :
                `http://localhost:8081/api/check-mail-token`;
    
            try {
                const response = await axios.get(url, {
                    params: {
                        emailCheckToken: tokenFromUrl,
                        email: email
                    }
                });
                if (response.data.code === 1) {
                    console.log("유효한 이메일 입니다.");
                } else {
                    console.log("토큰이 유효하지 않습니다.");
                    alert("유효하지 않은 이메일입니다.");
                }
            } catch (error) {
                console.error("이메일 토큰 유효성 검사중 오류 발생: ", error);
                alert("이메일 토큰 유효성 검사중 오류 발생");
            }
        }
    };

    useEffect(() => {
        handleGet(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
    }, [location, authData]);


    return (
        <div className="flex justify-center items-center h-screen mt-[-5rem]">
            <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recode</h3>
                    <br />
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">비밀번호 변경</h5>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">안전한 비밀번호로 계정을 보호하세요. 다른 곳에서 사용하지 않는 비밀번호 설정을 권한합니다.</label>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                required
                            />
                            <label
                                htmlFor="showPassword"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="sr-only"
                                    checked={showPassword}
                                    onChange={toggleShowPassword}
                                />
                                <span className="text-sm text-gray-900 dark:text-white">비밀번호 표시</span>
                            </label>
                        </div>
                    </div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            required
                        />
                        <label
                            htmlFor="showConfirmPassword"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id="showConfirmPassword"
                                className="sr-only"
                                checked={showConfirmPassword}
                                onChange={toggleShowConfirmPassword}
                            />
                            <span className="text-sm text-gray-900 dark:text-white">비밀번호 표시</span>
                        </label>
                    </div>
                    {passwordMatch === false && <div className="text-red-500">비밀번호가 일치하지 않습니다.</div>}
                    {passwordMatch === true && <div className="text-green-500">비밀번호가 일치합니다.</div>}
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
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}