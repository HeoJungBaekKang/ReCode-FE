import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const PostDetail = () => {
    const { postId, study_room_id, postReply_id } = useParams();
    const { authData } = useContext(AuthContext); // 로그인 상태를 가져옵니다.
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        "data": {
            "id": "",
            "title": "",
            "nickName": "",
            "createdAt": "",
            "content": ""
        }
    });

    useEffect(() => {
        // postId를 사용하여 서버로부터 해당 글의 정보를 가져오는 요청
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/study/${study_room_id}/post/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("API 응답:", response.data);
                setPostData({ data: response.data.data });

                // 댓글 데이터를 가져오는 요청
                const commentsResponse = await axios.get(`http://localhost:8080/api/v1/study/${study_room_id}/post/${postId}/${postReply_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });

                console.log("댓글 응답:", commentsResponse.data);
                setComments(commentsResponse.data.data);

            } catch (error) {
                console.error("글 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchPostData();
    }, [postId, study_room_id]);

    // 전체 postData 객체를 로그로 출력
    useEffect(() => {
        console.log("게시글 데이터:", postData);
    }, [postData]);


    // 수정 버튼 클릭 시의 동작
    const handleEdit = () => {

        navigate(`/studyroom/${study_room_id}/post/edit/${postId}`);
        console.log("수정 버튼 클릭:", postId);
    };

    // 삭제 버튼 클릭 시의 동작
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/v1/study/${study_room_id}/post/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                }
            );

            if (response.data.code === 1) {
                console.log("글 삭제 성공 : ", response.data);
                navigate(`/studyroom/board/${study_room_id}`);
            } else {
                console.log("글 삭제 실패 :", response);
            }
        } catch (error) {
            console.log("글 삭제 중 오류 발생 :", error);
        }
    };



    /** 댓글 **/
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, nickName: "댓글 작성자1", content: "댓글 내용1" },
        { id: 2, nickName: "댓글 작성자2", content: "댓글 내용2" },
        // 기존 댓글 데이터 추가
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
            axios.post(
                `http://localhost:8080/api/v1/study/${study_room_id}/post/${postId}/postReply`,
                {
                    postId: postId,
                    content: comment,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`,
                    },
                }
            )
                .then(response => {
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
                .catch(error => {
                    console.error(error);
                });
        }
    };



    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-xl font-semibold mb-8">{postData.data && postData.data.title}</label>

                    <div className="mb-4">
                        {postData && (
                            <>
                                {/* <p className="text-lg font-semibold mb-2">{postData.title}</p> */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                    글 번호: {postData.data && postData.data.id} | 작성자: {postData.data && postData.data.nickName} | 작성일: {postData.data && postData.data.createdAt}
                                </p>
                                <p className="text-gray-700 dark:text-white">{postData.data && postData.data.content}</p>
                            </>
                        )}
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
                                            <span className="font-bold text-blue-500">{comment.nickName}</span>
                                            <p className="ml-2 text-gray-700 dark:text-white">{comment.content}</p>
                                            <p className="ml-2 text-gray-700 dark:text-white">{comment.createdAt}</p>
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
