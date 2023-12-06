import React from "react";
import { useParams } from 'react-router-dom';
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

const ApplicationDetail = () => {

    const { id } = useParams();
    // 여기에서 id에 해당하는 신청자의 세부 정보를 서버에서 가져오고 렌더링

    const data = {
        name: 'huno',
        email: 'huno@naver.com',
        introduction: '안녕하세요',
    }

    const handleApprove = () => {
        // 승인 로직 추가
        console.log(`승인 버튼이 클릭되었습니다. ID: ${id}`);
    };

    const handleReject = () => {
        // 거절 로직 추가
        console.log(`거절 버튼이 클릭되었습니다. ID: ${id}`);
    };


    return (
        <>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="text-lg mr-12 font-semibold">이름</span>
                            <span className="text-lg">{data.name}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-10">
                            <span className="text-lg mr-12 font-semibold">이메일</span>
                            <span className="text-lg">{data.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="text-lg mr-12 font-semibold">자기소개</span>
                        <span className="text-lg">{data.introduction}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="space-x-2 ml-auto">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleApprove}
                        >
                            승인
                        </button>
                    </div>
                    <div className="space-x-2 ml-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleReject}
                        >
                            거절
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ApplicationDetail;