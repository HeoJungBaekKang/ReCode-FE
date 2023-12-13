import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaSidebar from "../Qna/QnaSidebar";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchNoticeList } from "../../services/NoticeService.js";

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  const { authData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleRowClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
  };

  const chunkedPosts = chunk(noticeList, 9);
  const currentPagePosts = chunkedPosts[currentPage - 1];

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  async function fetchData() {
    try {
      const response = await fetchNoticeList(currentPage); // API에서 공지사항 목록을 가져오는 함수

      const notices = response.data.map((notice) => ({
        ...notice,
        content: stripHtml(notice.content),
      }));
      setNoticeList(notices); // 가져온 데이터를 상태에 설정
    } catch (error) {
      console.log("목록 불러오기 실패", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <QnaSidebar />
      <div className="ml-56 mt-12">
        <Card className="h-full w-auto mx-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  공지사항
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            글번호
                          </th>
                          <th scope="col" className="px-6 py-4">
                            제목
                          </th>
                          <th scope="col" className="px-6 py-4">
                            내용
                          </th>
                          <th scope="col" className="px-6 py-4">
                            작성자
                          </th>
                          <th scope="col" className="px-6 py-4">
                            작성일
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticeList.length > 0 ? (
                          chunkedPosts[currentPage].map((notice) => (
                            <tr
                              onClick={() => handleRowClick(notice.id)}
                              key={notice.id}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {notice.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {notice.title}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {notice.content}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {notice.createdBy}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {notice.createdAt}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">공지사항이 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <label for="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-10 flex justify-center items-center">
          <div className="flex justify-start w-full max-w-3xl space-x-4">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              style={{ width: "100px" }}
            >
              <span className="sr-only">Action button</span>
              카테고리
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownAction"
              className={`absolute z-15 ${isOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              style={{ marginTop: "55px" }}
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    전체
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    글 번호
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    제목만
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    작성자
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    작성일
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="검색어를 입력해주세요."
                />
              </div>
              {authData.isAdmin && (
                <Link to={"/notice/create"}>
                  <button className="text-gray-900 bg-white border border-gray-300 border-5 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-30 px-3 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    공지사항 글 작성
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
              <li key="previous-button">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? "text-neutral-500" : "text-neutral-600"
                    } transition-all duration-300 dark:text-neutral-400`}
                >
                  Previous
                </button>
              </li>
              {chunkedPosts.map((_, index) => (
                <li key={`page-button-${index}`}>
                  <button
                    onClick={() => setCurrentPage(index)}
                    className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg ${index === currentPage
                        ? "bg-gray-300 text-neutral-600"
                        : "bg-gray-100 text-neutral-600"
                      } transition-all duration-300 dark:text-black dark:hover:bg-neutral-700 dark:hover:text-white`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li key="next-button">
                <button
                  disabled={currentPage === chunkedPosts.length - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedPosts.length - 1
                      ? "text-neutral-600"
                      : "text-neutral-600"
                    } transition-all duration-300 dark:text-neutral-400`}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

function chunk(array, size) {
  const chunked_arr = [];
  let copied = [...array];
  while (copied.length > 0) {
    chunked_arr.push(copied.splice(0, size));
  }
  return chunked_arr;
}
