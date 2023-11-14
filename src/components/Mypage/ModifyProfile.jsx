import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ModifyProfile() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  console.log(authData);

  const [user, setUser] = useState({
    email: "",
    nickname: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.put(`http://localhost:8081/api/v1/users/${authData.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`
      }
    })
      .then(res => {
        console.log(res.data);
      });
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen mt-[-20rem]">
        <div className="w-full max-w-xl mt-80 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">기본정보 수정</h5>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">정보를 변경하면 페이지 내의 모든 컨텐츠에 반영됩니다.</label>
          <div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={user.nickname}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 mt-5">
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
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
