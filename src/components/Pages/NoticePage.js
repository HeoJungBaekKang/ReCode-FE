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
import {
  fetchNoticeList,
  handleSearchKeyword,
} from "../../services/NoticeService.js";
import NoticeSearch from "../Notice/NoticeSearch";

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  // 상태 선언
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [displayList, setDisplayList] = useState([]);

  const handleRowClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
  };

  // 일반 목록 불러오기
  async function fetchDefaultList() {
    try {
      const response = await fetchNoticeList(currentPage); // API에서 공지사항 목록을 가져오는 함수
      setDisplayList(response.data); // 가져온 데이터를 상태에 설정
      
      console.log(response.data);
    } catch (error) {
      console.log("목록 불러오기 실패", error);
    }
  }

  // 키워드 검색 컴포넌트 핸들러 검색 결과 출력  result 에 검색 결과 담김
  const handleSearch = async (searchType, searchTerm) => {
    console.log("허찬 바보 : ", searchType, searchTerm);
    const response = await handleSearchKeyword(
      searchType,
      searchTerm,
      setResults
    );
    console.log(" response 백승주 바보 : ", response.data);
    setDisplayList(response.data);
    console.log("강민희 바보 :", displayList);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 기본 목록 가져오기
    fetchDefaultList();
  }, []);
  const chunkedPosts = chunk(displayList, 10);

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
                    {/* 검색 결과가 있으면 검색 결과를, 없으면 기본 공지사항 목록을 렌더링 */}
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th className="whitespace-nowrap px-6 py-4 font-medium">
                            글번호
                          </th>
                          <th className="whitespace-nowrap px-6 py-4 font-medium">
                            제목
                          </th>
                          <th className="whitespace-nowrap px-6 py-4">
                            작성자
                          </th>
                          <th className="whitespace-nowrap px-6 py-4">
                            작성일
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayList.length > 0 ? (
                          chunkedPosts &&
                          chunkedPosts[currentPage] &&
                          chunkedPosts[currentPage].map((notice, index) => (
                            <tr
                              onClick={() => handleRowClick(notice.id)}
                              key={notice.id}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {/* {notice.id} */}
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {notice.title}
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

        <div className="relative mt-10 flex justify-center items-center">
          <div className="flex justify-start w-full max-w-3xl space-x-4">
            <NoticeSearch onSearch={handleSearch} />

            {authData.isAdmin && (
              <Link to={"/notice/create"}>
                <button className="text-gray-900 bg-white border border-gray-300 border-5 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-30 px-3 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  공지사항 글 작성
                </button>
              </Link>
            )}
          </div>
          <div>
            <div className="mt-6 flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                  <li key="previous-button">
                    <button
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                        currentPage === 0
                          ? "text-neutral-500"
                          : "text-neutral-600"
                      } transition-all duration-300 dark:text-neutral-400`}
                    >
                      Previous
                    </button>
                  </li>
                  {chunkedPosts.map((_, index) => (
                    <li key={`page-button-${index}`}>
                      <button
                        onClick={() => setCurrentPage(index)}
                        className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg ${
                          index === currentPage
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
                      className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                        currentPage === chunkedPosts.length - 1
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
        </div>
        <div className="mt-6 flex justify-center">
          <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
              <li key="previous-button">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                    currentPage === 0 ? "text-neutral-500" : "text-neutral-600"
                  } transition-all duration-300 dark:text-neutral-400`}
                >
                  Previous
                </button>
              </li>
              {chunkedPosts.map((_, index) => (
                <li key={`page-button-${index}`}>
                  <button
                    onClick={() => setCurrentPage(index)}
                    className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg ${
                      index === currentPage
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
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                    currentPage === chunkedPosts.length - 1
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
