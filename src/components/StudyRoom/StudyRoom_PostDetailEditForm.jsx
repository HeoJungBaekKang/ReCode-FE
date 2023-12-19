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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  // 파일 업로드
  const uploadFile = async (file) => {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        '/file/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('파일 업로드 성공', response.data);
      return response.data;
    } catch (error) {
      console.error('파일 업로드 중 에러 발생', error);
      throw error;
    }
  };

  const handlePostUpdate = async () => {
    try {

      // 파일 업로드 먼저 동작
      const fileName = await uploadFile(selectedFile);

      // 게시글 데이터에 파일 이름 추가
      const postDataWithFile = {
        ...postData,
        fileName: fileName,
      };

      console.log("전송 전 postDataWithFiel", postDataWithFile);

      const response = await axios.put(
        `/api/v1/study/${study_id}/post/edit/${post_id}`,
        postDataWithFile,
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
            <div className="mb-4">
              <label
                htmlFor="formFile"
                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              >
                파일 첨부
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-4 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                onChange={handleFileChange}
              />
            </div>
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
