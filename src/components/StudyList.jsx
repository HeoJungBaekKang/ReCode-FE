import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function StudyList() {

  const navigate = useNavigate();

  const { authData } = useContext(AuthContext); // 로그인 상태를 가져옵니다.

  const [posts, setPost] = useState([]);

  const handleGet = async () => {
    try {
      const headers = authData.userId
        ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.token}`,
          }
        : {
            'Content-Type': 'application/json',
          };
  
      const response = await axios.get(`http://localhost:8081/api/main/list`, { headers });
  
      console.log(response.data);
  
      setPost(response.data.data || []);
  
      const code = response.data.code;
  
      if (code === 1) {
        console.log("스터디 목록 불러오기 성공");
      } else {
        console.log("스터디 목록 불러오기 실패");
      }
    } catch (error) {
      console.error("스터디 목록 조회 중 오류 : ", error);
    }
  };  

  const checkStudyRoomMembership = async (studyRoomId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/users/${authData.userId}/studyrooms/${studyRoomId}/isInStudyRoom`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      });

      return response.data.isInStudyRoom;
    } catch (error) {
      console.error("스터디룸 가입 여부 확인 중 오류 : ", error);

      throw error;
    }
  }

  const handleStudyRoomClick = async (studyRoomId) => {
    if (authData.userId) {
      const isInStudyRoom = await checkStudyRoomMembership(studyRoomId);
      navigate(isInStudyRoom ? `/studyroom/${studyRoomId}` : `/studyroomNotLogin/${studyRoomId}`);
    } else {
      navigate(`/studyroomNotLogin/${studyRoomId}`);
    }
  }  

  const chunkedPosts = chunk(posts, 9)

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    handleGet();
  }, []);

  if (!chunkedPosts[currentPage]) {
    return <div>스터디가 없습니다.</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">모집 중인 스터디</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            함께 배우고 성장해봐요!
          </p>
        </div>
        <div class="justify-items-stretch">
          <div className="bg-white py-24 sm:py-5">
            <div className="mx-auto max-w-9xl px-4 lg:px-1">
              <div className="mx-auto mt-10m max-w-2xl gap-y-4 gap-x-4 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-3 grid-flow-row-dense">
                {chunkedPosts[currentPage].map((post) => (
                  <article key={post.id} className="flex max-w-xl flex-col items-start justify-between border-2 border-gray-200 p-4 rounded-md">
                    <div className="flex items-center gap-x-4 text-xs">
                      <div className="text-gray-500">
                        {post.study_name}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${post.max_num - post.current_num <= 2 && post.max_num !== post.current_num ? 'bg-red-400 text-white' :
                        post.max_num > post.current_num ? 'bg-green-400 text-white' :
                          'bg-gray-400 text-white'
                        }`}>
                        {
                          post.max_num - post.current_num <= 2 && post.max_num !== post.current_num ? '마감 임박' :
                            post.max_num > post.current_num ? '모집중' :
                              '모집 완료'
                        }
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      {post.skillNames.map((skill, index) => (
                        <span key={index} style={{ marginRight: '10px' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600 cursor-pointer">
                        <div onClick={() => handleStudyRoomClick(post.id)}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </div>
                      </h3>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <div>
                            <span className="absolute inset-0" />
                            {post.masterNickname}
                          </div>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <nav aria-label="Page navigation example">
                  <ul className="list-style-none flex">
                    <li key="previous-button">
                      <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                      >
                        Previous
                      </button>
                    </li>
                    {chunkedPosts.map((_, index) => (
                      <li key={`page-button-${index}`}>
                        <button
                          onClick={() => setCurrentPage(index)}
                          className={`relative block rounded px-3 py-1.5 text-sm ${index === currentPage ? 'text-neutral-50 bg-blue-200' : 'text-neutral-600'} transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li key="next-button">
                      <button
                        disabled={currentPage === chunkedPosts.length - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedPosts.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function chunk(array, size) {
  const chunked_arr = []
  let copied = [...array]

  while (copied.length > 0) {
    chunked_arr.push(copied.splice(0, size))
  }

  return chunked_arr
}