/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { Typography } from "@material-tailwind/react";
import ReactHtmlParser from "html-react-parser";

const PostDetail = () => {
  const { post_id, study_id, postReply_id } = useParams();
  const { authData } = useContext(AuthContext); // 로그인 상태를 가져옵니다.
  const navigate = useNavigate();
  const [matchingFiles, setMatchingFiles] = useState([]);

  const [postData, setPostData] = useState({
    data: {
      id: "",
      title: "",
      nickName: "",
      createdAt: "",
      content: "",
      fileName: "",
    },
  });

  useEffect(() => {
    // post_id를 사용하여 서버로부터 해당 글의 정보를 가져오는 요청
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/study/${study_id}/post/${post_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        console.log("API 응답:", response.data);
        setPostData({ data: response.data.data });
      } catch (error) {
        console.error("글 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPostData();
  }, [post_id, study_id]);

  // 수정 버튼 클릭 시의 동작
  const handleEdit = () => {
    navigate(`/studyroom/${study_id}/post/edit/${post_id}`);
    console.log("수정 버튼 클릭:", post_id);
  };

  // 삭제 버튼 클릭 시의 동작
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/study/${study_id}/post/${post_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.code === 1) {
        console.log("글 삭제 성공 : ", response.data);
        navigate(`/studyroom/board/${study_id}`);
      } else {
        console.log("글 삭제 실패 :", response);
      }
    } catch (error) {
      console.log("글 삭제 중 오류 발생 :", error);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`/file/download/${fileName}`, {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // 파일이름 설정
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 중 에러 발생 :", error);
    }
  };

  /** 댓글 **/
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    // 기존 댓글 데이터 추가
    {
      id: "",
      nickName: "",
      createdAt: "",
      content: "",
    },
  ]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      // 댓글 추가 로직을 구현하고, comments 상태를 업데이트
      const newComment = {
        id: comments.length + 1,
        nickName: "", // 실제로는 로그인된 사용자 정보를 가져와야 합니다.
        content: comment,
      };

      // 서버에 댓글 데이터를 전송
      axios
        .post(
          `/api/v1/study/${study_id}/post/${post_id}/postReply`,
          {
            post_id: post_id,
            content: comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          // 서버 응답이 성공적일 경우, 댓글 목록에 새 댓글 추가
          const newComment = {
            id: response.data.data.id,
            nickName: response.data.data.nickName, // 서버에서 받아온 사용자 정보
            content: response.data.data.content,
            createdAt: response.data.data.createdAt, // 서버에서 받아온 작성 시간
          };
          setComments([...comments, newComment]);
          setComment(""); // 댓글 작성 폼 초기화
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchPostReplyData = async () => {
    try {
      const postReplyResponse = await axios.get(
        `/api/v1/study/${study_id}/post/${post_id}/postReply`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      console.log("댓글 응답:", postReplyResponse.data);
      setComments(postReplyResponse.data.data);
    } catch (error) {
      // 훈호님 바보
      console.error("댓글 정보를 가져오는 중 오류 발생:", error.response);
    }
  };

  useEffect(() => {
    fetchPostReplyData();
  }, [post_id, study_id, postReply_id, authData.token]);

  // 댓글 수정
  const [editingComment, setEditingComment] = useState(null);
  // 댓글 수정 중인지 여부를 나타내는 상태 추가
  const [isEditing, setIsEditing] = useState(false);

  const handleEditComment = (comment) => {
    // 댓글의 id만을 editingComment 상태에 저장
    setEditingComment(comment.id);
    setIsEditing(true);
  };

  const handleEditingCommentChange = (e, comment) => {
    // 댓글의 id만을 사용하여 해당 댓글의 내용을 업데이트
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id ? { ...c, content: e.target.value } : c
      )
    );
  };

  const handleUpdateComment = async (comment) => {
    console.log("postReply_Id", postReply_id);
    try {
      const response = await axios.put(
        `/api/v1/study/${study_id}/post/${post_id}/postReply/edit/${comment.id}`,
        {
          content: comment.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.code === 1) {
        console.log("댓글 수정 성공 : ", response.data);
        // 서버 응답이 성공적일 경우, 수정 상태를 초기화
        setEditingComment(null);
      } else {
        console.log("댓글 수정 실패 :", response);
      }
    } catch (error) {
      console.log("댓글 수정 중 오류 발생 :", error);
      console.log("서버 응답:", error.response); // 서버 응답 기록
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `/api/v1/study/${study_id}/post/${post_id}/postReply/delete/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.status === 200) {
        // 댓글 삭제가 성공하면, 댓글 목록을 다시 불러옵니다.
        console.log("댓글 삭제 성공 : ", response.data);
        loadComments();
      }
    } catch (error) {
      console.log("댓글 삭제 중 오류 발생 :", error);
    }
  };

  // 댓글 삭제 후 댓글 목록 다시 불러오기
  const loadComments = async () => {
    try {
      const postReplyResponse = await axios.get(
        `/api/v1/study/${study_id}/post/${post_id}/postReply`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setComments(postReplyResponse.data.data);
    } catch (error) {
      console.error("댓글 정보를 가져오는 중 오류 발생:", error.response);
    }
  };

  const handleCancelEdit = (comment) => {
    console.log("취소 전 상태", comments);

    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id ? { ...c, content: comment.content } : c
      )
    );
    window.location.reload(true);
    console.log("취소 후 상태", comments);

    // 수정 상태를 초기화합니다.
    setEditingComment(null);
    setIsEditing(false);
  };

  return (
    <div>
      <StudyRoom_Sidebar />
      <div className="max-w-screen-md mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
          <label className="text-sm leading-6 text-gray-500">
            {postData.data && (
              <>
                {postData.data.category === 0 && "공지사항"}
                {postData.data.category === 1 && "회고록"}
                {postData.data.category === 2 && "자료공유"}
                <br></br>
              </>
            )}
          </label>
          <label className="block text-xl font-semibold mb-2">
            {postData.data && postData.data.title}
          </label>

          <div className="mb-4">
            {postData && (
              <>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  글 번호: {postData.data && postData.data.id} | 작성자:{" "}
                  {postData.data && postData.data.nickName} | 작성일:{" "}
                  {postData.data && postData.data.createdAt}
                  <hr />
                </p>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <div className="block text-sm font-medium leading-6 text-gray-900">
                    {ReactHtmlParser(postData.data && postData.data.content)}
                  </div>
                </Typography>
              </>
            )}
           
          </div>

          {/* 수정 버튼과 삭제 버튼 */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="col-span-2"></div> {/* 비어있는 두 칸 */}
            <button
              onClick={handleEdit}
              className="col-span-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-500"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="col-span-1 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-500"
            >
              삭제
            </button>
             {/* 파일 검색 결과 표시 */}
             <div className="file-search-results my-1 flex items-center">
          
              <span
                style={{
                  border: "0px solid #ccc",
                  padding: "1px",
                  margin: "1px",
                  display: "inline-block",
                  borderRadius: "1px",
                  fontSize:"small",
                  
                }}
              >
                {postData.data.fileName}
              </span>
              <img
                src="/img/download-icon.png"
                alt="download-logo"
                border="0"
                className="h-6 sm:h-6 cursor-pointer hover:opacity-75"
                onClick={() => handleDownload(postData.data.fileName)}
              />
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="mb-4 mt-10">
            <h2 className="text-lg font-semibold mb-2">댓글</h2>
            {comments.length === 0 ? (
              <div className="text-gray-500">댓글이 없습니다.</div>
            ) : (
              <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {comments.map((comment) => (
                  <li key={comment.id} className="py-2">
                    <div className="flex items-start">
                      <span className="font-bold text-blue-500">
                        {comment.nickName}
                      </span>
                      <div className="ml-2 text-gray-700 dark:text-white">
                        {comment.content}
                      </div>
                      <div className="ml-2 text-gray-700 dark:text-white">
                        {comment.createdAt}
                      </div>
                      <div className="flex items-right ml-auto">
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="ml-2 px-0 py-0 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="ml-2 mx-2 px-0 py-0 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-red-600"
                        >
                          삭제
                        </button>
                      </div>
                    </div>

                    {/* 수정 폼 */}
                    {editingComment === comment.id && (
                      <div className="mt-2 flex flex-col items-end">
                        <textarea
                          value={comment.content}
                          onChange={(e) =>
                            handleEditingCommentChange(e, comment)
                          }
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          rows="2"
                          style={{ resize: "none" }}
                        ></textarea>
                        <div className="flex items-right ml-auto">
                          <button
                            onClick={() => handleUpdateComment(comment)}
                            className="ml-2 px-0 py-0 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                          >
                            저장
                          </button>
                          <button
                            onClick={() => handleCancelEdit(comment)}
                            className="ml-2 mx-2 px-0 py-0 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 댓글 작성 폼 */}
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
            >
              댓글 작성
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              rows="4"
              placeholder="댓글을 입력하세요..."
              style={{ resize: "none" }}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
