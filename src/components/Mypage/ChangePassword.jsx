import React, { useState } from "react";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
                                id="password"
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
                            id="confirmPassword"
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
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
