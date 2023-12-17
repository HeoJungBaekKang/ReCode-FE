import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Join() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
    confirmPassword: ""
  });

  const [isUsernameValidated, setIsUsernameValidated] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isNicknameValidated, setIsNicknameValidated] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const CheckUsernameDuplicate = async () => {
    try {
      await axios.get(`http://localhost:8081/api/user-name/${formData.username}/exists`
      )
     
        .then(response => {
          const code = response.data.code;

          console.log(response)

          if (code === 1) {
            console.log("아이디 중복 확인 성공");
            alert("사용 가능한 아이디입니다.");
            setIsUsernameValidated(true);
          } else if (code === -1){
            alert("이미 사용 중인 아이디 입니다.");
          }
        });
    } catch (error) {
      console.error("중복 확인 중 오류 발생 : ", error.data.code);
    }
  };

  const CheckNicknameDuplicate = async () => {
    try {
      await axios.get(`http://localhost:8081/api/nickname/${formData.nickname}/exists`
      )
     
        .then(response => {
          const code = response.data.code;

          console.log(response)

          if (code === 1) {
            console.log("닉네임 중복 확인 성공");
            alert("사용 가능한 닉네임입니다.");
            setIsNicknameValidated(true);
          } else if (code === -1){
            alert("이미 사용 중인 닉네임 입니다.");
          }
        });
    } catch (error) {
      console.error("중복 확인 중 오류 발생 : ", error.data.code);
    }
  };

  const CheckEmailDuplicate = async () => {
    try {
      const response = await axios.get(`/api/user-email/${formData.email}/exists`);
      if (response.data.code === 1) {
        alert("사용 가능한 이메일입니다.");
        setIsEmailValidated(true);
      } else {
        alert(response.data.msg);
        setIsEmailValidated(false);
      }
    } catch (error) {
      alert("중복 확인 중 오류 발생");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email || !formData.nickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!isUsernameValidated || !isEmailValidated) {
      alert("아이디 및 이메일 중복확인 후 진행해주시기 바랍니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await AuthService.signup(formData);
      if (response.data.code === 1) {
        alert("회원가입 성공");
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 중 오류 발생");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://i.ibb.co/b5QpxVy/Recode-logo.png"
            alt="Recode logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  name="idCheck"
                  onClick={CheckUsernameDuplicate}
                  className="h-9 ml-px w-24 relative inline-flex items-center rounded-r-md border 
                          border-gray-300 bg-indigo-700 px-4 py-2 text-xs font-medium text-white-700 
                    hover:bg-indigo-600 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nickname
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  autoComplete="nickname"
                  required
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  name="idCheck"
                  onClick={CheckNicknameDuplicate}
                  className="h-9 ml-px w-24 relative inline-flex items-center rounded-r-md border 
                          border-gray-300 bg-indigo-700 px-4 py-2 text-xs font-medium text-white-700 
                    hover:bg-indigo-600 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  name="emailCheck"
                  onClick={CheckEmailDuplicate}
                  className="h-9 ml-px w-24 relative inline-flex items-center rounded-r-md border 
                          border-gray-300 bg-indigo-700 px-4 py-2 text-xs font-medium text-white-700 
                    hover:bg-indigo-600 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
         ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
         focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm 
                  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
