import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Typography } from "@material-tailwind/react";
import { getUserNotifications } from "../../services/NorificationService";
import { Link } from "react-router-dom";

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState(0);
  const [notificationCount, setNotificationCount] = useState();

  // 알림 불러오기
  useEffect(() => {
    async function getUserNotificationList() {
      try {
        const response = await getUserNotifications();
        setNotifications(response.data);
        console.log(response.data);

        setNotificationCount(response.data.length);
        console.log("notificationCount", response.data.length);
        // status가 0인 알림 개수 세기
        const unreadNotificationCount = response.data.filter(
          (notification) => notification.readStatus == 0
        ).length;

        console.log("unreadNotificationCount : ", unreadNotificationCount);
        setNotificationCount(unreadNotificationCount);
      } catch (error) {
        console.log("알림 목록 불러오기 실패", error);
      }
    }
    getUserNotificationList();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "채팅", path: "#" },
    { label: "QnA", path: "/qna" },
    { label: "스터디 목록", path: "/" },
  ];

  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthData({});
    localStorage.removeItem("token");
    localStorage.removeItem("authData"); // authData를 로컬 스토리지에서 삭제

    navigate("/");
  };

  const [timeLeft, setTimeLeft] = useState(60 * 60);

  // 타이머 업데이트 함수
  const updateTimer = () => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 0) {
        handleLogout(); // 시간이 다 되면 로그아웃
        return 0;
      }
      return prevTime - 1;
    });
  };

  let timer;
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, 1000 * 60 * 60); // 60 minutes 동안 로그인 유지
    };

    window.addEventListener("load", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return (
    <>
      <header style={{ borderBottom: "1px solid #ccc" }}>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img
                src="/Recode-logo.png"
                alt="Recode-logo"
                border="0"
                className="mr-3 h-6 sm:h-9"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Recode
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              {authData.token != null ? (
                <>
                  <div className="flex items-center mr-5 whitespace-nowrap w-auto">
                    <span className="flex items-center mr-2 whitespace-nowrap w-auto text-green-500 font-bold">
                      {authData.nickname}
                    </span>{" "}
                    <span className="text-black-500 font-bold">
                      님 환영합니다.
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Log out
                    </span>
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Log in
                  </span>
                </a>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className={`${
                isMenuOpen
                  ? "flex flex-col absolute right-0 w-1/4 top-[3.5rem]"
                  : "hidden"
              } lg:flex lg:flex-row left-10 lg:items-center lg:w-auto lg:relative z-10 ml-10`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {authData.token != null && ( // 추가된 부분: 사용자가 로그인 중일 때만 알림 버튼 표시
                  <span className="flex-1 text-gray-700 ms-3 whitespace-nowrap">
                    <Link to="/notification">
                      알림
                      {notificationCount > 0 && (
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                  </span>
                )}
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`${isMenuOpen ? "bg-gray-200" : ""}`}
                  >
                    <a
                      href={item.path}
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {authData.role === "ADMIN" ? (
                  <li>
                    <a
                      href={`/admin/studymanagement`}
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      ADMIN
                    </a>
                  </li>
                ) : authData.role === "CUSTOMER" ? (
                  <li>
                    <a
                      href={`/mypage/${authData.id}`}
                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      마이페이지
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Main;
