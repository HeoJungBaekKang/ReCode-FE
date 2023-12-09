import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [username, setUsername] = useState(prompt("아이디를 입력하세요"));
  const [roomNum, setRoomNum] = useState(prompt("채팅 방 번호를 입력하세요"));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, data]);
    };

    return () => {
      eventSource.close();
    };
  }, [roomNum]);

  const addMessage = async () => {
    const msgInput = document.querySelector("#chat-outgoing-msg");
    const chat = {
      sender: username,
      roomNum: roomNum,
      msg: msgInput.value
    };

    await fetch("http://localhost:8080/chat", {
      method: "post",
      body: JSON.stringify(chat),
      headers: {
        "Content-Type": "application/json;charset=utf8"
      }
    });

    msgInput.value = "";
  };

  return (
    <div>
      <MessageList messages={messages} username={username} />
      <MessageInput onSendMessage={addMessage} />
    </div>
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
