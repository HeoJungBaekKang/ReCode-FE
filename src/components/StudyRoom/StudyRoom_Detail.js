import React from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const StudyRoom_Detail = () => {


    // test
    const post = {
        title: '제목',
        content: '내용',
        category: '카테고리',
        date: '2023-11-10',
    };

    return (
        <div>
            <StudyRoom_Sidebar />

            <div className="max-w-screen-md mx-auto p-4">
                {/* 글 상세 내용 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="mr-4">{post.category}</span>
                        <span>{post.date}</span>
                    </div>
                    <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                    <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
                </div>
            </div>
        </div>
    );
};


export default StudyRoom_Detail;