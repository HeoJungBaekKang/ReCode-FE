import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const EditPost = () => {
    const { authData } = useContext(AuthContext);
    const { post_id, study_id } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        category: "",
        title: "",
        content: ""
    });

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`/api/v1/study/${study_id}/post/${post_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
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
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                }
            );

            if (response.data.code === 1) {
                navigate(`/studyroom/${study_id}/post/${post_id}`);
            } else {
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
                    <label className="block text-xl font-semibold mb-8">게시글 수정</label>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={postData.title || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="제목을 입력하세요..."
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            본문
                        </label>
                        <textarea
                            name="content"
                            value={postData.content || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows="8"
                            placeholder="게시글 내용을 입력하세요..."
                        ></textarea>
                    </div>

                    <button onClick={handlePostUpdate}>수정 완료</button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
