import React from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const Post = () => {
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
                            <option value="technology"></option>
                            <option value="technology">Java</option>
                            <option value="technology">SpringBoot</option>
                            <option value="technology">Python</option>
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