import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { CardHeader, CardBody, Card } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useHistory import

export default function ChatList() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
    
      const response = await axios.get('http://localhost:8081/api/v1/chat/chat-list', {
        headers: {
          Authorization: `Bearer ${authData.token}`
        },
      });

      const data = response.data;
      setChatRooms(data.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const handleChatRoomClick = (chatRoomId, nickname) => {
    navigate(`./chatApp/${chatRoomId}/${nickname}`);
  };


  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="border-2 border-black rounded-lg w-3/4">
          <div className="w-full bg-white rounded-md shadow-md mr-10">
            <Card className="divide-y divide-gray-200">
              <CardHeader className="p-5 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Chat Rooms</h2>
              </CardHeader>
              <CardBody>
                <ul>
                  {chatRooms.map((room) => (
                    <li
                      key={room.chatRoomId}
                      className="p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleChatRoomClick(room.chatRoomId, authData.nickname)}
                    >                      
                    <div className="flex items-center gap-3">
                        <div className="grid gap-0.5 text-sm">
                          <div className="font-medium">{room.title}</div>
                          <div className="text-gray-500 dark:text-gray-400">{room.lastMessage}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-gray-500 text-sm">
                        <p>
                          <span>{room.usernameList.join(', ')}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
            <div className="p-4">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => { navigate('/chatCreate'); }} // 버튼 클릭 시 navigateToCreateChatRoom 함수 호출
              >
                Create Chat Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
