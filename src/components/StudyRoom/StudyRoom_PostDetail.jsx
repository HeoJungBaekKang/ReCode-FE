import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const PostDetail = () => {
    const { postId } = useParams();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, author: "댓글 작성자1", content: "댓글 내용1" },
        { id: 2, author: "댓글 작성자2", content: "댓글 내용2" },
        // 기존 댓글 데이터 추가
    ]);


    // 예시 데이터
    const postData = {
        id: postId,
        title: "쪄뉸낌찌찌꺠까쬬아요",
        author: "huno",
        date: "2023-11-14",
        content: "코딩코딩코딩코딩코딩코딩코딩코딩",
    };

    // 수정 버튼 클릭 시의 동작
    const handleEdit = () => {
        // 수정 버튼을 눌렀을 때의 동작 추가
        console.log("수정 버튼 클릭:", postId);
    };

    // 삭제 버튼 클릭 시의 동작
    const handleDelete = () => {
        // 삭제 버튼을 눌렀을 때의 동작 추가
        console.log("삭제 버튼 클릭:", postId);
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim() !== "") {
            // 댓글 추가 로직을 구현하고, comments 상태를 업데이트합니다.
            const newComment = {
                id: comments.length + 1,
                author: "huno", // 실제로는 로그인된 사용자 정보를 가져와야 합니다.
                content: comment,
            };
            setComments([...comments, newComment]);
            setComment(""); // 댓글 작성 폼 초기화
        }
    };


    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-xl font-semibold mb-8">게시글 상세보기</label>

                    <div className="mb-4">
                        <p className="text-lg font-semibold mb-2">{postData.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            글 번호: {postData.id} | 작성자: {postData.author} | 작성일: {postData.date}
                        </p>
                        <p className="text-gray-700 dark:text-white">{postData.content}</p>
                    </div>

                    {/* 수정 버튼과 삭제 버튼 */}
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                            삭제
                        </button>
                    </div>



                    {/* 댓글 목록 */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">댓글</h2>
                        {comments.length === 0 ? (
                            <p className="text-gray-500">댓글이 없습니다.</p>
                        ) : (
                            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                                {comments.map((comment) => (
                                    <li key={comment.id} className="py-2">
                                        <div className="flex items-start">
                                            <span className="font-bold text-blue-500">{comment.author}</span>
                                            <p className="ml-2 text-gray-700 dark:text-white">{comment.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* 댓글 작성 폼 */}
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            댓글 작성
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="4"
                            placeholder="댓글을 입력하세요..."
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
