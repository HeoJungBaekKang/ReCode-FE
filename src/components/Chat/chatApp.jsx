import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatApp = () => {
  const {nickname,chatRoomId} = useParams();
  const [messages, setMessages] = useState([]); // messages 변수를 빈 배열로 초기화

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${chatRoomId}`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, data]);
    };
    
    return () => {
      eventSource.close(); // WebFlux 연결 해제
    };
  }, [chatRoomId]);

  const addMessage = async () => {
    const msgInput = document.querySelector("#chat-outgoing-msg");
    const chat = {
      sender: nickname,
      roomNum: chatRoomId,
      msg: msgInput.value
    };

    await axios.post("http://localhost:8080/chat", {
      method: "post",
      body: JSON.stringify(chat),
      headers: {
        "Content-Type": "application/json;charset=utf8"
      }
    });

    msgInput.value = "";
  };

  return (
    <>
     <div className="flex items-center p-4 border-b border-gray-300">
        <div className="flex flex-col">
          <span className="font-semibold">John Doe</span>
        </div>
      </div>
    <div>
    <MessageList messages={messages} username={nickname} />
    <MessageInput onSendMessage={addMessage} />
    </div>

    </>
  );
};

const MessageList = ({ messages, username }) => (
  <div id="chat-box">
    {messages.map((message, index) => (
      <Message key={index} message={message} isOwnMessage={message.sender === username} />
    ))}
  </div>
);

const Message = ({ message, isOwnMessage }) => {
  const md = message.createdAt.substring(5, 10);
  const tm = message.createdAt.substring(11, 16);
  const convertTime = `${md} | ${tm}`;

  return (
    <div className={isOwnMessage ? "outgoing_msg" : "incoming_msg"}>
      {isOwnMessage ? (
        <div className="sent_msg">
          <p>{message.msg}</p>
          <span className="time_date">{convertTime}</span>
        </div>
      ) : (
        <>
          <p style={{ fontSize: '14px' }}>{message.sender}</p>
          <div className="received_withd_msg">
            <p>{message.msg}</p>
            <span className="time_date">{convertTime}</span>
          </div>
        </>
      )}
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => (
  <div>
    <input id="chat-outgoing-msg" type="text" onKeyDown={(e) => { if (e.keyCode === 13) onSendMessage(); }} />
    <button id="chat-send" onClick={onSendMessage}>Send</button>
  </div>
);

export default ChatApp;
