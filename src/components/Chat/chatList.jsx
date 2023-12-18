import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { CardBody, Card } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function ChatList() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
    
      const response = await axios.get('/api/v1/chat/chat-list', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
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

  const handleDeleteChatRoom = async (chatRoomId) => {
    try {
      await axios.delete(`/api/v1/chat/${chatRoomId}/delete-chatRoom`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      });

      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('Error deleting chat room:', error);
      alert(error);
    }
  };
  
  const handleLeaveChatRoom = async (chatRoomId) => {
    try {
      await axios.delete(`/api/v1/chat/${chatRoomId}/leave-chatRoom`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      });

      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('Error leaving chat room:', error);
      alert(error);
    }
  };
  

  return (
    <>
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="border-2 border-black rounded-lg w-3/4">
                <div className="w-full bg-white rounded-md shadow-md mr-10">
                    <Card className="divide-y divide-gray-200">
                      <div className="flex-col space-y-1.5 p-5 border-b border-gray-200 flex justify-start">
                        <h2 className="text-2xl font-bold">Chat Rooms</h2>
                      </div>
                        <CardBody>
                            <ul>
                                {chatRooms.map((room) => (
                                <React.Fragment key={room.chatRoomId}>
                                    <li key={room.chatRoomId} className="p-4 hover:bg-gray-100 cursor-pointer" onClick={()=> handleChatRoomClick(room.chatRoomId, authData.nickname)}
                                        >
                                        <div className="flex items-center gap-3">
                                            <div className="grid gap-0.5 text-sm">
                                                <div className="font-medium">{room.title}</div>
                                                <div className="text-gray-500 dark:text-gray-400">방장 : {room.createdBy}</div>
                                                <div className="text-gray-500 dark:text-gray-400">{room.lastMessage}</div>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-gray-500 text-sm">
                                            <p>
                                                <span>{room.usernameList.join(', ')}</span>
                                            </p>
                                        </div>
                                    </li>
                                    <div className="flex justify-center mt-2">
                                      <button className="p-4 border-none bg-transparent flex items-center justify-center" key={`delete-${room.chatRoomId}`} onClick={() => handleDeleteChatRoom(room.chatRoomId)}>
                                        <img src="/img/delete.png" alt="삭제" style={{ width: '20px', height: '20px' }} />
                                      </button>
                                      <button className="p-4 border-none bg-transparent flex items-center justify-center" key={`leave-${room.chatRoomId}`} onClick={() => handleLeaveChatRoom(room.chatRoomId)}>
                                        <img src="/img/logout.png" alt="나가기" style={{ width: '20px', height: '20px' }} />
                                      </button>
                                </div>
                                  </React.Fragment>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                    <div className="p-4" flex items-center justify-center>
                      <img
                        src="/img/add.png"
                        alt="채팅방 생성"
                        style={{ width: '50px', height: '50px' }}
                        onClick={() => { navigate('./create'); }}
                      />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
