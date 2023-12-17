import React, { useState, useEffect, useContext } from "react";
import QnaSidebar from "../Qna/QnaSidebar";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  fetchNoticeDetail,
  saveNotice,
  deleteNotice,
  
} from "../../services/NoticeService.js";
import ReactHtmlParser from "html-react-parser";
import MyEditor from "../Editor/MyEditor";
export default function NoticeDetailPage() {
  const { authData } = useContext(AuthContext);
  const { noticeId } = useParams();
  console.log(noticeId);
  const navigate = useNavigate();
  const handleGoToList = () => {
    navigate("/notice"); // '목록' 페이지의 경로로 이동
  };
  const [noticeTitle, setNoticeTitle] = useState(""); // 상세 공지사항 제목 상태
  const [noticeCreatedAt, setNoticeCreatedAt] = useState(""); // 상세 공지사항 작성일 상태

  const [noticeContent, setNoticeContent] = useState(""); // 상세 공지사항 내용 상태
  const [editedContent, setEditedContent] = useState(""); // 수정한 내용 상태
  const [noticeCreatedBy, setNoticeCreatedBy] = useState("");
  const [noticeUpdatedAt, setNoticeUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // fetchNoticeDetail 함수를 사용하여 데이터를 가져오는 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNoticeDetail(noticeId);
        const data = response.data;
        setNoticeTitle(data.title);
        setNoticeCreatedAt(data.createdAt);
        setNoticeContent(data.content);
        setNoticeCreatedBy(data.createdBy);
        setNoticeUpdatedAt(data.updatedAt);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [noticeId]); // noticeId가 변경될 때마다 데이터를 다시 가져오도록 설정

  const handleDelete = async () => {
    if (window.confirm("이 공지사항을 삭제하시겠습니까?")) {
      try {
        await deleteNotice(noticeId);
        navigate("/notice"); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error("삭제 중 오류 발생", error);
        // 오류 처리
      }
    }
  };
  const handleSaveChanges = async () => {
    try {
      await saveNotice(noticeId, noticeTitle, noticeContent);

      setIsEditMode(false); // 성공 시 편집 모드 해제
    } catch (error) {
      // 오류 처리
    }
  };

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleCreatedByChange = () => {
    setNoticeCreatedBy(!isReplyOpen);
  };
  const handleEditButtonClick = () => {
    setIsEditMode(true);
    setEditedContent(noticeContent); // 이 내용을 MyEditor에게 전달
  };
  const handleTitleChange = (event) => {
    setNoticeTitle(event.target.value);
  };
  const handleContentChange = (newContent) => {
    setNoticeContent(newContent); // 글 내용 입력란의 값이 변경되면 상태 업데이트
  };
  return (
    <>
      <QnaSidebar />
      <div className="ml-56 text-center">
        <div className="ml-3 text-2xl font-bold">
          공지사항
          <div className="ml-2 text-xs text-gray-500 font-light"></div>
        </div>
        <div className="text-xs text-gray-500 font-light mt-2">
          레코드의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.
        </div>
        <br />
        <Card className="h-full w-auto mx-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {isEditMode ? (
                    <>
                      <tr className="border-b">
                        <td className="p-2 font-medium text-sm">제목</td>
                        <td colSpan="3" className="p-2">
                          <input
                            type="text"
                            value={noticeTitle}
                            onChange={handleTitleChange}
                            className="border-2 border-gray-300 p-2 rounded-md w-full text-sm"
                          />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium text-sm">작성일</td>
                        <td className="p-2 text-sm" colSpan="3">
                          {noticeCreatedAt}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-sm">작성자</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={noticeCreatedBy}
                            onChange={handleCreatedByChange}
                            className="border-2 border-gray-300 p-2 rounded-md w-full text-sm"
                          />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="border-b">
                        <td className="p-2 font-medium text-sm">제목</td>
                        <td className="p-2 text-sm" colSpan="3">
                          {noticeTitle}
                        </td>
                      </tr>
                      {/* <tr className="border-b">
                        <td className="p-2 font-medium text-sm">작성일</td>
                        <td className="p-2 text-sm">{noticeCreatedAt}</td>
                      </tr> */}
                      <tr className="border-b">
                        <td className="p-2 font-medium text-sm">
                          {noticeUpdatedAt &&
                          noticeCreatedAt !== noticeUpdatedAt
                            ? "수정일"
                            : "작성일"}
                        </td>
                        <td className="p-2 text-sm">
                          {noticeUpdatedAt &&
                          noticeCreatedAt !== noticeUpdatedAt
                            ? noticeUpdatedAt
                            : noticeCreatedAt}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium text-sm">작성자</td>
                        <td className="p-2 text-sm">{noticeCreatedBy}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <tbody>
                <div className="ml-5 mr-5 sm:col-span-2">
                  <div className="mt-2.5">
                    {isEditMode ? (
                      <MyEditor
                        // <input
                        data={editedContent}
                        name="noticeContent"
                        id="noticeContent"
                        rows={11}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        initialContent={noticeContent}
                        onContentChange={handleContentChange}
                      />
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <div>
                          {ReactHtmlParser(noticeContent)}
                        </div>
                      </Typography>
                    )}
                  </div>
                </div>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <div className="ml-56">
        <div className="flex justify-end mt-4 mr-5 space-x-4">
          {isEditMode ? (
            <button
              onClick={handleSaveChanges}
              className="px-3 py-1 my-2 w-24 bg-green-500 text-white rounded whitespace-nowrap"
            >
              저장
            </button>
          ) : (
            <>
              {authData.isAdmin || authData.userId === noticeCreatedBy ? (
                <button
                  onClick={handleEditButtonClick}
                  className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap"
                >
                  수정
                </button>
              ) : null}
              <button
                onClick={handleGoToList}
                className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap"
              >
                목록
              </button>
              {authData.isAdmin && (
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded"
                >
                  삭제
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}







