import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const Post = () => {

    const navigate  = useNavigate();

    // 작성된 글의 상태를 관리하는 state
    const [newPost, setNewPost] = useState({
        category: "",
        title: "",
        content: "",
    });

    // 글 작성 완료 버튼을 클릭했을 때 실행되는 함수
    const handlePostSubmit = async () => {
        try {
            // 작성된 글을 서버로 전송
            console.log("전송 전 newPost:", newPost); // 디버깅용

            const response = await axios.post("http://localhost:8081/api/v1/study/{study_room_id}/posts", newPost);
            console.log("글 작성이 완료되었습니다.");
            console.log("서버에서 받은 응답:", response.data);


            // 작성이 완료되면 입력 필드 초기화
            setNewPost({
                category: "",
                title: "",
                content: "",
            });

            // 상세보기 페이지로 이동
            navigate .push(`/post/${response.data.id}`);

            console.log("전송 후 newPost:", newPost); // 디버깅용

        } catch (error) {
            console.error("글 작성 중 오류 발생:", error);
        }
    };

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
                            className="w-13 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="Java">Java</option>
                            <option value="SpringBoot">SpringBoot</option>
                            <option value="Python">Python</option>
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="제목을 입력하세요..."
                        />
                    </div>



                    {/* 본문 입력 */}
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            본문
                        </label>
                        <textarea
                            id="content"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="8"
                            placeholder="게시글 내용을 입력하세요..."
                        ></textarea>
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

export default Post;