import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import './FindIdForm.css';

export default function FindIdForm() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: "" });
  const [showModal, setShowModal] = useState(false);
  const [foundUsername, setFoundUsername] = useState("");

  const handleInputChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/find-username`, { email: info.email }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data);
      const code = response.data.code;

      if (code === 1) {
        console.log("입력 정보 : ", info);
        setFoundUsername(response.data.data.username);
        setShowModal(true);
      } else {
        console.log("아이디 찾기 실패");
      }
    } catch (error) {
      console.log("아이디 찾기 중 오류 발생 :", error);
    }
  };

  const modalPosition = {
    width: "70%",
    maxWidth: "38rem",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen mt-[-5rem]">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recode</h3>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">아이디 찾기</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                value={info.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="가입하신 이메일을 입력해주세요."
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                취소
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                아이디 찾기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog style={modalPosition}>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Recode
              </h5>
            </TEModalHeader>
            <div className="mt-10 mb-10">
              <TEModalBody>아이디 : {foundUsername}</TEModalBody>
            </div>
            <TEModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => { navigate('/login') }}
                >
                  로그인 창으로 돌아가기
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </>
  );
}
