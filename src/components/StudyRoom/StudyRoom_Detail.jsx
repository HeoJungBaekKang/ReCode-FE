import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { Typography } from "@material-tailwind/react";
const StudyRoomNotLogin = () => {
  const navigate = useNavigate();
  const { study_id } = useParams();
  const { authData } = useContext(AuthContext);
  const [detail, setDetail] = useState({
    study_id: "",
    studyName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    currentNum: "",
    maxNum: "",
    master: "",
    skillNames: [],
    attendanceDay: [],
    createdAt: "",
    updatedAt: "",
    userId: "",
  });
  const [badge, setBadge] = useState({
    userId: detail.userId,
    name: "",
  });
  const handleGet = async () => {
    try {
      await axios
        .get(`/api/study/${study_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setDetail(response.data.data || {});
          const code = response.data.code;
          if (code === 1) {
            checkStudyRoomMembership();
            checkStudyRoomMembership();
          } else {
          }
        });
    } catch (error) {
    }
  };
  const [isInStudyRoom, setIsInStudyRoom] = useState(false);
  const handlePost = async () => {
    try {
      await axios
        .post(
          `/api/v1/study/${study_id}/apply`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        )
        .then((response) => {
          const code = response.data.code;
          if (code === 1) {
          } else {
          }
        });
    } catch (error) {
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
    justifyContent: "center",
  };
  const [showModal, setShowModal] = useState(false);
  // 스터디룸 가입 여부를 확인하는 함수
  const checkStudyRoomMembership = async () => {
    if (!authData) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }
    try {
      const response = await axios.get(
        `/api/v1/users/${authData.id}/studyrooms/${study_id}/isInStudyRoom`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setIsInStudyRoom(response.data);
    } catch (error) {
    }
  };
  // 신청 버튼 클릭 핸들러
  const handleStudyRoomClick = async () => {
    if (!authData.id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    try {
      await checkStudyRoomMembership();
      if (isInStudyRoom) {
        alert("이미 가입된 스터디입니다.");
      } else {
        await handlePost();
        alert("스터디 신청 완료");
        navigate("/");
      }
    } catch (error) {
    }
  };
  const handleGetBadge = async () => {
    const userId = detail.userId;
    if (!userId) {
      return;
    }
    try {
      const response = await axios.get(`/api/get-badge/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data && response.data.code === 1) {
        setBadge(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };
  const badgeImages = {
    Seed: "/img/Seed.png",
    Sprout: "/img/Sprout.png",
    Seedling: "/img/Seedling.png",
    Bud: "/img/Bud.png",
    Bloom: "/img/Bloom.png",
  };
  useEffect(() => {
    handleGet();
    handleGetBoard();
    handleGetQuiz();
  }, []);

  useEffect(() => {
    if (detail.userId) {
      handleGetBadge();
    }
  }, [detail.userId]);

  const TABLE_ROWS = [
    {
      name: (
        <>
          1. 스터디 탈퇴 시, 해당 스터디 룸에서 제공되는 서비스에 접근하실 수
          없습니다.
          <br />
          2. 탈퇴timers 시, 해당 스터디 룸에서의 모든 권한이 해제됩니다.
          <br />
          3. 탈퇴 후 동일한 스터디로 재가입이 가능하나 기존의 데이터와 연동되지
          않습니다.
          <br />
          4. 탈퇴 버튼을 통해 탈퇴가 완료됩니다.
        </>
      ),
    },
  ];
  const handleWithdrawStudy = async () => {
    try {
      const response = await axios.post(
        `/api/v1/study/${study_id}/withdraw`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      });
      const code = response.data.code;
      if (code === 1) {
        navigate(`/mypage/${authData.id}`);
      } else {
        alert("탈퇴 실패", response);
      }
    } catch (error) {
    }
  }

  /*
    게시판 리스트 불러오기
  */

  const [posts, setPost] = useState([]);

  const handleGetBoard = async () => {
    try {
      let url = `/api/v1/study/${study_id}/list`;

      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      })
        .then(response => {

          setPost(response.data.data || []);

          const code = response.data.code;

          if (code === 1) {
          } else {
          }
        });
    } catch (error) {
    }
  }

  /*
    퀴즈 리스트 불러오기
  */
  const [quizzes, setQuizzes] = useState([]);

  const handleGetQuiz = async () => {
    if (!study_id) {
      return;
    }

    try {
      let url = `/api/v1/study/${study_id}/quiz-list`;

      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`
        }
      })
        .then(response => {

          const code = response.data.code;

          setQuizzes(response.data.data || []);

          if (code === 1) {
          } else {
          }
        });
    } catch (error) {
    }
  }

  return (
    <>
      <StudyRoom_Sidebar />
      <div className="ml-56 mt-12">
        <div className="max-w-screen-lg max-h-screen mx-auto p-4">
          <div className="px-4 sm:px-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold leading-7 text-gray-900">
                {detail.title}
              </h2>
              <div
                className={`text-sm px-3 py-1 w-20 rounded-full ${detail.maxNum - detail.currentNum <= 2 &&
                  detail.maxNum !== detail.currentNum
                  ? "bg-red-400 text-white"
                  : detail.maxNum > detail.currentNum
                    ? "inline-block bg-green-400 text-white"
                    : "bg-gray-400 text-white"
                  }`}
              >
                {detail.maxNum - detail.currentNum <= 2 &&
                  detail.maxNum !== detail.currentNum
                  ? "마감 임박"
                  : detail.maxNum > detail.currentNum
                    ? "모집중"
                    : "모집 완료"}
              </div>
            </div>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {" "}
              {detail.createdAt}{" "}
            </p>
            <div className="flex items-center text-sm font-medium -leading-6 text-gray-600">
              <div className="flex items-center">
                <span>작성자 | {detail.master}</span>
                {badge.name && (
                  <img
                    src={badgeImages[badge.name]}
                    alt={badge.name}
                    className="ml-2"
                    style={{ width: "30px", height: "30px" }} // 이미지 크기 조절
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  스터디 이름
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.studyName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  모집 인원
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.maxNum} 명{" "}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  진행 기간
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.startDate} ~ {detail.endDate}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  출석 시간
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {detail.startTime} ~ {detail.endTime}{" "}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  출석 요일
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {Array.isArray(detail.attendanceDay) &&
                    detail.attendanceDay.map(
                      (
                        attendanceDay,
                        index // 배열인지 확인
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                        >
                          {attendanceDay}
                        </span>
                      )
                    )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  기술 스택
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {Array.isArray(detail.skillNames) &&
                    detail.skillNames.map(
                      (
                        skill,
                        index // 배열인지 확인
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-1sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 ">
                  소개
                </dt>
                <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {ReactHtmlParser(detail.description)}
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <TERipple rippleColor="white">
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setShowModal(true)}
                  >
                    탈퇴
                  </button>
                </TERipple>
              </div>
            </dl>
            {/* Modal */}
            <TEModal show={showModal} setShow={setShowModal}>
              <TEModalDialog style={modalPosition}>
                <TEModalContent>
                  <TEModalHeader>
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        탈퇴 안내
                      </Typography>
                      <Typography color="gray" className="mt-2 w-80 font-normal">
                        스터디 탈퇴에 대한 안내 사항입니다.
                      </Typography>
                    </div>
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={() => setShowModal(true)}
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </TEModalHeader>
                  <TEModalBody>
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                      <tbody>
                        {TABLE_ROWS.map(({ name }, index) => {
                          const classes =
                            index === TABLE_ROWS.length - 1
                              ? "p-4"
                              : "p-4 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <div className="flex items-center">
                                      <hr className="flex-grow border-t border-gray-300" />
                                      <span className="px-3 text-gray-500">
                                        유의 사항
                                      </span>
                                      <hr className="flex-grow border-t border-gray-300" />
                                    </div>
                                    <br />
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {name}
                                    </Typography>
                                    <br />
                                    <div className="flex items-center">
                                      <hr className="flex-grow border-t border-gray-300" />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </TEModalBody>
                  <TEModalFooter>
                    <TERipple
                      rippleColor="light"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap mr-2"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        onClick={() => handleWithdrawStudy()}
                      >
                        탈퇴
                      </button>
                    </TERipple>
                  </TEModalFooter>
                </TEModalContent>
              </TEModalDialog>
            </TEModal>
          </div>
        </div>
        <div className="max-w-screen-lg max-h-screen mx-auto p-4">
          <div className="px-9 sm:px-0">
            <div className="flex justify-center gap-8">
              <div className="w-1/2 p-4">
                <div className="flex flex-col items-center">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="py-4">전체글보기</th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="py-4 flex justify-end">
                                <Link to={`/studyroom/board/${study_id}`} className="text-gray-250 hover:underline">
                                더보기 >
                                </Link>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {posts.slice(0, 10).map((post, index) => (
                              <tr
                                key={index}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td className="w-20 p-4">
                                  <div className="flex items-center">
                                    <Link to={`/studyroom/${study_id}/post/${post.id}`}>{post.id}</Link>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <Link to={`/studyroom/${study_id}/post/${post.id}`}>
                                    {post.title.length > 13 ? `${post.title.substring(0, 13)}...` : post.title}
                                  </Link>
                                </td>
                                <td className="px-2 py-4">
                                  {post.nickname}
                                </td>
                                <td className="px-6 py-4">
                                  {post.createdAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-4">
                <div className="flex flex-col items-center">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="py-4">전체글보기</th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="py-4 flex justify-end">
                                <Link to={`/studyroom/quiz/${study_id}`} className="text-gray-250 hover:underline">
                                더보기 >
                                </Link>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {quizzes.slice(0, 10).map((quiz, index) => (
                              <tr
                                key={index}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td className="w-20 p-4">
                                  <div className="flex items-center">
                                    {quiz.id}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <Link to={`/studyroom/quiz/${study_id}`}>
                                    {quiz.title.length > 13 ? `${quiz.title.substring(0, 13)}...` : quiz.title}
                                  </Link>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <img src="https://i.ibb.co/r7CGcbr/star-emoji-clipart-md-removebg-preview.png" alt="star-emoji-clipart-md-removebg-preview" border="0" style={{ width: '20px', height: '20px' }} />{quiz.difficulty}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {quiz.nickname}
                                </td>
                                <td className="py-4">
                                  {quiz.updatedAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-lg max-h-screen mx-auto p-4">
          <div className="px-9 sm:px-0">
            <div className="flex justify-center gap-8">
              <div className="w-1/2 p-4">
                <div className="flex flex-col items-center">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="py-4">전체글보기</th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="px-6 py-4"></th>
                              <th scope="col" className="py-4 flex justify-end">
                                <Link to={`/studyroom/board/${study_id}`} className="text-gray-250 hover:underline">
                                더보기 >
                                </Link>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {posts.slice(0, 10).map((post, index) => (
                              <tr
                                key={index}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td className="w-20 p-4">
                                  <div className="flex items-center">
                                    <Link to={`/studyroom/${study_id}/post/${post.id}`}>{post.id}</Link>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <Link to={`/studyroom/${study_id}/post/${post.id}`}>
                                    {post.title.length > 13 ? `${post.title.substring(0, 13)}...` : post.title}
                                  </Link>
                                </td>
                                <td className="px-2 py-4">
                                  {post.nickname}
                                </td>
                                <td className="px-6 py-4">
                                  {post.createdAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-4">
                <div className="flex flex-col items-center">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <div className="col-span-1 border-b rounded-t-lg rounded-l-lg p-4">
                          <Link to={`/studyroom/quiz/${study_id}`} className="flex justify-end text-gray-250 hover:underline text-sm font-bold">
      더보기 >
                          </Link>
                        </div>
                        <div className="col-span-1 border-b rounded-t-lg rounded-r-lg p-4">
                          <div className="grid grid-cols-1 grid-rows-2 gap-4">
                          </div>
                          {quizzes.slice(0, 5).map((quiz, index) => (
                            <React.Fragment key={index}>
                              <div className="col-span-2 border rounded-lg transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 p-4">
                                <div className="flex items-center">
                                  {quiz.id}
                                </div>
                                <div>
                                  <Link to={`/studyroom/quiz/${study_id}`}>
                                    {quiz.title.length > 13 ? `${quiz.title.substring(0, 13)}...` : quiz.title}
                                  </Link>
                                </div>
                                <div className="flex items-center">
                                  <img src="https://i.ibb.co/r7CGcbr/star-emoji-clipart-md-removebg-preview.png" alt="star-emoji-clipart-md-removebg-preview" border="0" style={{ width: '20px', height: '20px' }} />{quiz.difficulty}
                                </div>
                                <div>
                                  {quiz.nickname}
                                </div>
                                <div>
                                  {quiz.updatedAt}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudyRoomNotLogin;