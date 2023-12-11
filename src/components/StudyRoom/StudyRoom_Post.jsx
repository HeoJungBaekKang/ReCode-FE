import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { useParams } from "react-router-dom/dist";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../ckeditor.css';



export default function Post() {
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext); // 로그인 상태를 가져옵니다.
    const { study_id } = useParams();

    // 작성된 글의 상태를 관리하는 state
    const [newPost, setNewPost] = useState({
        category: "",
        title: "",
        content: "",
        studyRoomId: study_id,
        userId: authData.id
    });

    // 글 작성 완료 버튼을 클릭했을 때 실행되는 함수
    const handlePostSubmit = async () => {
        try {
            // 작성된 글을 서버로 전송
            console.log("전송 전 newPost:", newPost); // 디버깅용

            // 작성된 글을 서버로 전송하되, headers 객체를 axios.post() 메소드의 세 번째 매개변수로 전달합니다.
            const response = await axios.post(
                `http://localhost:8081/api/v1/study/${study_id}/posts`,
                newPost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                }
            );

            const code = response.data.code;

            if (code === 1) {
                console.log("글 작성 성공 : ", response.data);
                setNewPost(response.data.data.newPost || {});

                // 게시판 목록 페이지로 이동
                navigate(`/studyroom/board/${study_id}`);

            } else {
                console.log("글 작성 실패 :", response);
            }
        } catch (error) {
            console.log("글 작성 중 오류 발생 :", error.config);
            console.log(newPost);
            console.log(newPost.id);
        }
    };

    useEffect(() => {
        console.log("Study Room ID:", study_id);
    }, [study_id, authData]);

    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-xl font-semibold mb-8">게시글 작성</label>

                    {/* 카테고리 선택 */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            카테고리
                        </label>
                        <select
                            id="category"
                            value={newPost.category}
                            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                            className="w-13 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">선택하세요</option>
                            <option value="1">공지사항</option>
                            <option value="2">회고록</option>
                            <option value="3">자료 공유</option>
                            {/* 다른 카테고리 옵션들 추가 */}
                        </select>
                    </div>

                    {/* 제목 입력 */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={newPost.title || ''}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="제목을 입력하세요..."
                        />
                    </div>

                    {/* 본문 입력 */}
                    <div className="mb-4 ck-editor__editable">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            본문
                        </label>
                        {/* <textarea
                            id="content"
                            value={newPost.content || ''}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="8"
                            placeholder="게시글 내용을 입력하세요..."
                            style={{ resize: "none" }}
                        ></textarea> */}

                        <CKEditor
                            editor={ClassicEditor}
                            data={newPost.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setNewPost({ ...newPost, content: data });
                            }}
                            editorConfig={{
                                height: ''
                            }}
                        />

                    </div>

                    {/* 작성완료 버튼 */}
                    <button
                        onClick={handlePostSubmit}
                        className="mt-0.5 px-2.5 py-2 w-auto ml-auto bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        작성 완료
                    </button>
                </div>
            </div>
        </div>
    );
}