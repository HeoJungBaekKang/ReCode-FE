import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import MypageSidebar from "../Mypage/MypageSidebar";

export default function ChatCreate() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { authData } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/select-users`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setUsers(response.data.data.map(item => ({ id: item.user_id, nickname: item.nickname })));


      } catch (error) {
      }
    };

    fetchData();

  }, []);

  const handleComplete = async () => {

    if (selectedUserIds.length === 0) {
      alert('초대 멤버를 선택하십시오.');
      return;
    }
    const requestData = {
      chatRoomTitle: chatRoomTitle,
      userIdList: selectedUserIds
    };

    try {
      const response = await axios.post('/api/v1/chat/chatRoom', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      });
      // 요청이 성공한 후
      navigate('/chat');
    } catch (error) {
      // 요청이 실패한 경우
    }
  };

  return (

    <>
      <MypageSidebar />
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <button className="bg-green-400 text-white px-4 py-1 rounded-md hover:bg-green-500 focus:outline-none mr-40" onClick={() => { navigate('/chat') }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="bg-green-400 text-white px-4 py-1 rounded-md hover:bg-green-500 focus:outline-none" onClick={handleComplete}>
              완료
            </button>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">대화 상대 초대</h1>
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">채팅방 제목</label>
            <input type="text" id="search" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:border-green-400" placeholder="제목" value={chatRoomTitle} onChange={(e) => setChatRoomTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input type="text" id="search" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:border-green-400" placeholder="닉네임 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2 h-40 overflow-y-scroll">
            {users
              .filter((user) => user.nickname.includes(searchQuery))
              .map((user, index) => (
                <div className="flex items-center" key={index}>
                  <input id={`user-${index}`} type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={selectedUserIds.includes(user.id)} onChange={(e) => {
                    const userId = user.id;
                    if (e.target.checked) {
                      setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, userId]);
                    } else {
                      setSelectedUserIds((prevSelectedUserIds) => prevSelectedUserIds.filter((id) => id !== userId));
                    }
                  }}
                  />
                  <label htmlFor={`user-${index}`} className="flex items-center cursor-pointer">
                    {user.nickname}
                  </label>
                </div>
              ))}
          </div>


        </div>

      </div>
    </>

  );
};
