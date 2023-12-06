// src/FindPasswordForm.js
import React, { useState } from 'react';
import "./FindPasswordForm.css";

function FindPasswordForm() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const handleFindId = () => {
    // Implement find ID logic or navigate to the find ID page
  };

  const handleFindEmail = () => {
    // Implement find email logic or navigate to the find email page
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement password recovery logic
    console.log('Password recovery request:', { userId, email });
    // Code to send request to the server would go here
  };

  return (
    <div className="screen">
        <div className="div">
            <div className="view">
                <div className="text-wrapper-2">먼저 본인임을 인증해주세요</div>
                <div className="overlap">
                    <div className="text-wrapper-3">아이디 찾기</div>
                    <div className="text-wrapper-4">이메일 찾기</div>
                </div>
                <div className="overlap-group">
                    <img className="rectangle" alt="Rectangle" src="rectangle-52.svg" />
                    <div className="text-wrapper-5">다음</div>
                </div>
                <div className="text-wrapper-6">ReCode</div>
                <div className="frame">
                    <div className="div-wrapper">
                        <div className="text-wrapper-7">kim1234</div>
                    </div>
                    <div className="text-wrapper-8">아이디</div>
                    <div className="overlap-group-2">
                        <div className="text-wrapper-9">kimanydog1234@gmail.com</div>
                    </div>
                    <div className="text-wrapper-10">이메일</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FindPasswordForm;
