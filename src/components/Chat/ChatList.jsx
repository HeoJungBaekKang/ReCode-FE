import React from "react";
import "./ChatList.css";

export default function ChatList() {
  return (
    <div className="screen">
      <div className="div">
        <div className="text-wrapper">채팅 목록</div>
        <div className="view">
          <img className="profile-user" alt="Profile user" src="profile-user-1.png" />
          <div className="text-wrapper-2">사용자1, 사용자2,사용자3,사용자1, 사용자2,사용자3,..............</div>
          <p className="p">마지막으로 받은 메세지입니다 어쩌고 저쩌고................</p>
          <div className="text-wrapper-3">13:20</div>
        </div>
        <div className="view-2">
          <img className="profile-user" alt="Profile user" src="image.png" />
          <div className="text-wrapper-2">사용자1, 사용자2,사용자3,사용자1, 사용자2,사용자3,..............</div>
          <p className="p">마지막으로 받은 메세지입니다 어쩌고 저쩌고................</p>
          <div className="text-wrapper-3">13:20</div>
        </div>
        <div className="view-3">
          <img className="profile-user" alt="Profile user" src="profile-user-1-2.png" />
          <div className="text-wrapper-2">사용자1, 사용자2,사용자3,사용자1, 사용자2,사용자3,..............</div>
          <p className="p">마지막으로 받은 메세지입니다 어쩌고 저쩌고................</p>
          <div className="text-wrapper-3">13:20</div>
        </div>
        <img className="chat" alt="Chat" src="./chat-1.png" />
      </div>
    </div>
  );
};
