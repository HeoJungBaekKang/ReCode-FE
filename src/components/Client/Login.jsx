import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const { setAuthData } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        username,
        password,
      });

      const { code, data } = response.data;

      if (code === 1) {
        const { id, username, nickname, role, createdAt } = data; // role 추가 : minhee 
        const token = response.headers.authorization;
        const newAuthData = { id, username, nickname, role, createdAt, token };
        console.log(newAuthData);
        setAuthData(newAuthData);
        localStorage.setItem("token", token);
        localStorage.setItem("authData", JSON.stringify(newAuthData)); // authData를 로컬 스토리지에 저장
        console.log("로그인 성공");
        navigate("/");
      } else {
        setLoginError("아이디 혹은 비밀번호가 올바르지 않습니다. 다시 확인해주세요.")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("아이디 혹은 비밀번호가 올바르지 않습니다. 다시 확인해주세요.")
      } else {
        console.error("로그인 요청 중 오류 발생:", error);
      }
    }
  };

  const inputClass = loginError
    ? "block w-full rounded-md border-2 border-red-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://i.ibb.co/b5QpxVy/Recode-logo.png"
            alt="Recode-logo"
            border="0"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ID
                </label>
                <div className="text-sm">
                  <a
                    href="/client/findId"
                    className="font-semibold text-indigo-600 hover:text-red-500"
                  >
                    Forgot id?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                />
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
                <div className="text-sm">
                  <a
                    href="/email"
                    className="font-semibold text-indigo-600 hover:text-red-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                {loginError && (
                  <p className="text-sm text-red-500">{loginError}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/termsOfCondtions"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              join now
            </a>
          </p>
        </div >
      </div >
    </>
  );
}
