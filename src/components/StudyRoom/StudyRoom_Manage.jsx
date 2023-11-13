import React from 'react';
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";


const Manage = () => {

    const date = {
        CreateDate: '2023-11-13',
    };



    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4 flex flex-col">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-3xl font-semibold mb-6">스터디 관리</label>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-14">
                        <span className="text-sm mr-12 font-semibold">생성일</span>
                        <span className="text-sm">{date.CreateDate}</span>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-60 mb-4">
                            <span className="text-xl mr-4 font-semibold">스터디 모집 글</span>
                            <div className="flex items-end">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-40">
                                    버튼
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-60 mb-4">
                        <span className="text-xl mr-4 font-semibold">스터디 신청 현황</span>
                        <div className="flex items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-40">
                                버튼
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manage;
