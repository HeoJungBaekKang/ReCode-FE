import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import MypageSidebar from '../Mypage/MypageSidebar';

const ChatApp = () => {
  const navigate = useNavigate();
  const { nickname, chatRoomId } = useParams();

  useEffect(() => {
    //===
    const initMyMessage = (data) => {
      let chatBox = document.querySelector("#chat-box");

      let chatSendBox = document.createElement("div");
      chatSendBox.className = "outgoing_msg";
      chatSendBox.innerHTML = getSendMsgBox(data);
      chatBox.append(chatSendBox);

      document.documentElement.scrollTop = document.body.scrollHeight;
    };

    const initYourMessage = (data) => {
      let chatBox = document.querySelector("#chat-box");

      let chatReceivedBox = document.createElement("div");
      chatReceivedBox.className = "incoming_msg";
      chatReceivedBox.innerHTML = getReceiveMsgBox(data);
      chatBox.append(chatReceivedBox);

      document.documentElement.scrollTop = document.body.scrollHeight;
    };

    const addMessage = async () => {
      const msgInput = document.querySelector("#chat-outgoing-msg");

      if (msgInput.value.trim() === "") {
        // 메시지가 비어 있으면 아무 작업도 수행하지 않음
        return;
      }

      const chat = {
        sender: nickname,
        roomNum: chatRoomId,
        msg: msgInput.value,
      };

      fetch("http://52.79.108.89:8081/chat", {
        method: "post", //Http post 메소드
        body: JSON.stringify(chat), //JS Object -> JSON
        headers: {
          "Content-Type": "application/json;charset=utf8",
        },
      });

      msgInput.value = "";
    };

    const getSendMsgBox = (data) => {
      let md = data.createdAt.substring(5, 10);
      let tm = data.createdAt.substring(11, 16);
      let convertTime = md + " | " + tm;

      return `<div class="sent_msg"> <p>${data.msg}</p> <span class="time_date">${convertTime}</span> </div>`;
    };

    const getReceiveMsgBox = (data) => {
      let md = data.createdAt.substring(5, 10);
      let tm = data.createdAt.substring(11, 16);
      let convertTime = md + " | " + tm;

      return `<p style="font-size: 14px;">${data.sender}</p><div class="received_withd_msg"> <p>${data.msg}</p> <span class="time_date">${convertTime}</span> </div>`;
    };

    document.querySelector("#chat-send").addEventListener("click", () => {
      addMessage();
    });

    document
      .querySelector("#chat-outgoing-msg")
      .addEventListener("keydown", (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
          addMessage();
        }
      });

    //=====
    const eventSource = new EventSource(`http://52.79.108.89:8081/chat/roomNum/${chatRoomId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.sender === nickname) {
        // 로그인한 유저가 보낸 메세지
        // 파란 박스(오른쪽)
        initMyMessage(data);
      } else {
        //회색 박스(왼쪽)
        initYourMessage(data);
      }
    };

    return () => {
      eventSource.close(); // WebFlux 연결 해제
    };
  }, [chatRoomId]);

  return (
    <>
      {/* <StudyRoom_Sidebar /> */}
      <MypageSidebar />
      <div className="max-w-screen-md mx-auto p-4">
        <div className="container-fluid mt-10">
          <div className="row">
            <div className="col-sm-12">
              <div id="user_chat_data" className="user_chat_data">
                <div className="profile_name">
                  <button
                    onClick={() => navigate("/chat")}
                    className="flex justify-start w-20 text-xs back_button"
                  >
                    뒤로 가기
                  </button>
                  <span id="nickname">{nickname}</span>
                </div>
                <div
                  className="container-fluid chat_section"
                  id="chat-box"
                ></div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      id="chat-outgoing-msg"
                      type="text"
                      className="write_msg"
                      placeholder="Type a message"
                    />
                    <button id="chat-send" class="msg_send_btn" type="button">
                      <img src="/img/paper-plane.png" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* jQuery */}
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></script>

      {/* Popper.js */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossOrigin="anonymous"
      ></script>

      {/* Bootstrap JS */}
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default ChatApp;
