import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import MyEditor from "../Editor/MyEditor";

const EditPost = () => {
  const { authData } = useContext(AuthContext);
  const [editedContent, setEditedContent] = useState(""); // 수정한 내용 상태
  const { post_id, study_id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    category: "",
    title: "",
    content: "",
  });

  // minhee 추가
  const handleContentChange = (newContent) => {
    setPostData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
  };
  useEffect(() => {
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
        setPostData(response.data.data);
      } catch (error) {
        console.error("글 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPostData();
  }, [post_id, study_id]);

  const handlePostUpdate = async () => {
    try {
      const response = await axios.put(
        `/api/v1/study/${study_id}/post/edit/${post_id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.code === 1) {
        console.log("글 수정 성공 : ", response.data);
        navigate(`/studyroom/${study_id}/post/${post_id}`);
      } else {
        console.log("글 수정 실패 :", response);
      }
    } catch (error) {
      console.log("글 수정 중 오류 발생 :", error);
    }
  };

  // 폼 필드 변경 핸들러
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <StudyRoom_Sidebar />
      <div className="max-w-screen-md mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
          <label className="block text-xl font-semibold mb-8">
            게시글 수정
          </label>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              카테고리
            </label>
            <select
              name="category"
              value={postData.category || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="0">공지사항</option>
              <option value="1">회고록</option>
              <option value="2">자료 공유</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              제목
            </label>
            <input
              type="text"
              name="title"
              value={postData.title || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="제목을 입력하세요..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              본문
            </label>
            <MyEditor
              data={editedContent}
              initialContent={postData.content}
              onContentChange={handleContentChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              rows={8}
            />
            {/* <textarea
                        
                            name="content"
                            value={postData.content || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="8"
                            placeholder="게시글 내용을 입력하세요..."
                        ></textarea> */}
          </div>

          <button onClick={handlePostUpdate}>수정 완료</button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
