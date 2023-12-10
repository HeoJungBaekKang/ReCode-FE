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

    console.log(authData);

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

        // 비밀번호, 비밀번호 확인의 일치여부 확인
        if (password !== confirmPassword) {
            console.error("비밀번호가 일치하지 않습니다.");
            return;
        }

        const payload = {
            password: password,
            emailCheckToken: token
        };
        if (token) {
            // 토큰이 존재한다면 payload 에 추가
            payload.emailCheckToken = token;
        }

        console.log("페이로드가 전송됨: ", payload);

        // 엔드포인트 설정
        let url = `http://15.164.85.184/api/${authData && authData.token ? 'v1/' : ''}change-password`;

        // 헤더 설정, 헤더에 토큰이 필요할 경우 (로그인 유저)
        const headers = {};
        if (authData && authData.token) {
            headers.Authorization = `Bearer ${authData.token}`;
        }
        console.log("URL: ", url);
        console.log("Headers: ", headers);
        console.log("Payload: ", payload);

        // api 호출
        try {
            const response = await axios.post(url, payload, { headers });
            if (response.data.code === 1) {
                console.log("비밀번호 변경 성공");
                alert("비밀번호가 변경되었습니다.");

                // url 에서 토큰 정보 없애기
                const newUrl = window.location.pathname; // url 토큰 정보는 없어지지만 path 는 유지되도록
                navigate(newUrl, { replace: true }); // 페이지가 다시 로드되지 않고 현재의 Url을 변경

                navigate('/login'); // 비밀번호 변경이 성공되면 로그인 창으로 이동
            } else {
                console.log("비밀번호 변경 실패: ", response.data.msg);
            }
        } catch (error) {
            // 배포할 때는 에러 출력 부분 수정 필요!
            if (error.response) {
                // Request 가 존재하고 서버에서의 상태코드 출력
                console.error("에러 Response: ", error.response.data);
                console.error("에러 Status: ", error.response.status);
                console.error("에러 Headers: ", error.response.headers);
            } else if (error.request) {
                // Request 는 존재하지만 Response 가 없을때
                console.error("에러 Request: ".error.request);
            } else {
                console.error("비밀번호 변경 중 오류 발생: ", error.message);
            }
            // 오류의 config 객체 출력, Axios 요청에 상용된 매개변수에 대한 디버깅
            console.error("에러 Config: ", error.config);
        }
    };

    const handleGet = async () => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        const email = queryParams.get('email');

        if (tokenFromUrl && email) {
            // 유저 로그인 여부 엔드포인드 설정
            const url = authData && authData.token ?
                `http://15.164.85.184/api/v1/check-mail-token` :
                `http://15.164.85.184/api/check-mail-token`;

            // 헤더 설정
            const headers = {};
            if (authData && authData.token) {
                headers['Authorization'] = `Bearer ${authData.token}`;
            }


            try {
                const response = await axios.get(url, {
                    params: {
                        emailCheckToken: tokenFromUrl,
                        email: email
                    },
                    headers: headers
                });
                if (response.data.code === 1) {
                    console.log("유효한 이메일 입니다.");
                    // 토큰이 유효하면 비밀번호 변경을 진행
                } else {
                    console.log("토큰이 유효하지 않습니다.");
                    alert("토큰이 유효하지 않습니다. 이메일 전송을 다시 진행해주세요.");
                }
            } catch (error) {
                console.error("이메일 토큰 유효성 검사중 오류 발생: ", error);
                alert("이메일 토큰 유효성 검사중 오류 발생: ", error);
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