import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { fetchQnaList } from "../../services/QnaService";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import AdminSidebar from "../Admin/AdminSidebar";
import MypageSidebar from "../Mypage/MypageSidebar";

export default function Qna() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [qnaList, setQnaList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  //Qna 목록 조회
  async function fetchData() {
    try {
      const response = await fetchQnaList();
      setQnaList(response.data); // 가져온 데이터를 상태에 설정
    } catch (error) { }
  }
  useEffect(() => {
    fetchData();
  }, []);

  //Qna 단일 조회 핸들러
  const handleRowClick = (qnaId) => {
    navigate(`/qna/${qnaId}`);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 기본 목록 가져오기
    fetchData();
  }, []);
  const chunkedPosts = chunk(qnaList, 10);

  return (
    <>
      <Layout>
        <div className="ml-56 mt-20">
          {authData.role === "ADMIN" ? <AdminSidebar /> : <MypageSidebar />}

          <Card className="h-full w-auto mx-4">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    QnA
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
                            <th scope="col" className="px-6 py-4 ">
                              #
                            </th>
                            <th scope="col" className="px-6 py-4">
                              제목
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
                          {qnaList.length > 0 ? (
                            chunkedPosts &&
                            chunkedPosts[currentPage] &&
                            chunkedPosts[currentPage].map((qna, index) => (
                              <tr
                                onClick={() => handleRowClick(qna.id)}
                                key={[qna.id, index]}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {qna.title}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {qna.nickname}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {format(
                                    new Date(qna.createdAt),
                                    "yyyy-MM-dd HH:mm"
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">목록이 없습니다.</td>
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
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-10 flex justify-center items-center">
            <div className="flex justify-start w-full max-w-3xl space-x-4">

              <div
                id="dropdownAction"
                className={`absolute z-15 ${isOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                style={{ marginTop: "50px" }}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="     검색어를 입력해주세요."
                  />
                </div>

                <Link to={"/qna/post"}>
                  <button className="text-gray-900 bg-white border border-gray-300 border-5 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-20 px-3 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 whitespace-nowrap">
                    글 작성
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
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
