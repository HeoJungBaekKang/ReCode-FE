import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const CheckUsernameDuplicate = async (username) => {

  try {
    const response = await fetch(`/api/user-name/${username}/exists`);
    // const response = await fetch(`/api/user-name/${username}/exists`);
    console.log(response)
    const result = await response.json();
    console.log(result)
    return result;

  }
  catch (error) {
    return "err"
  }
}

const CheckEmailDuplicate = async (email) => {

  try {
    const response = await fetch(`/api/user-email/${email}/exists`);
    console.log(response)
    const result = await response.json();
    console.log(result)
    return result;

  }
  catch (error) {
    return "err"
  }
}

export default function Join() {
  const [username, setUsername] = useState(""); // 아이디 상태 변수
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setFormData({
      ...formData,
      username: e.target.value,
    })
    console.log(username)
  };

  const [isUsernameValidated, setIsUsernameValidated] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const handlename = async () => {
    const currentName = username
    const result = await CheckUsernameDuplicate(currentName);
    console.log(result.code)
    if (result.code === 1) {
      // 사용 가능한 아이디
      alert("사용 가능한 아이디입니다.");
      setIsUsernameValidated(true);
    } else if (result.code === -1) {
      // 이미 사용 중인 아이디
      alert("이미 사용 중인 아이디입니다.");
      setIsUsernameValidated(false);
    }
  }

  const userEmailHandler = (e) => {
    setEmail(e.target.value);
    setFormData({
      ...formData,
      email: e.target.value,
    })
    console.log(email)
  };

  const handleEmail = async () => {
    const currentEmail = email
    const result = await CheckEmailDuplicate(currentEmail);
    console.log(result.code)
    if (result.code === 1) {
      // 사용 가능한 이메일
      alert("사용 가능한 이메일입니다.");
      setIsEmailValidated(true);

    } else if (result.code === -1) {
      // 이미 사용 중인 이메일
      alert("이미 사용 중인 이메일입니다.");
      setIsEmailValidated(false);
    }
  }

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.username || !formData.password || !formData.email || !formData.nickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!isUsernameValidated) {
      alert("아이디 중복확인 후 진행해주시기 바랍니다.");
      return;
    }

    if (!isEmailValidated) {
      alert("이메일 중복확인 후 진행해주시기 바랍니다.");
      return;
    }

    try {
      const response = await AuthService.signup(formData);

      if (response.data.code === 1) {
        alert("회원가입 성공");
        navigate("/login");
      } else {
        alert("회원가입 실패");
        console.log("회원가입 실패 :", formData);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      console.log(formData);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/Recode-logo.png"
            alt="Recode-logo"
            border="0"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
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
                  onChange={usernameHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  name="idCheck"
                  onClick={handlename}
                  className="h-9 ml-px w-24 relative inline-flex items-center rounded-r-md border 
                          border-gray-300 bg-blue-700 px-4 py-2 text-xs font-medium text-white-700 
                    hover:bg-blue-600 focus:z-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
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
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  autoComplete="nickname"
                  required
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
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
                  onChange={userEmailHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  name="emailCheck"
                  onClick={handleEmail}
                  className="h-9 ml-px w-24 relative inline-flex items-center rounded-r-md border 
                          border-gray-300 bg-blue-700 px-4 py-2 text-xs font-medium text-white-700 
                    hover:bg-blue-600 focus:z-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
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
                     focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password 확인
                  </label>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm 
                  font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
