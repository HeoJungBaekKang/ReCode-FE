import React from "react";


const StudyRoomNotLogin = () => {

    // test
    const post = {
        title: '카카오톡 클론 코딩 스터디',
        studyName: 'Recode',
        createdBy: '정성현',
        createdAt: '2023-08-29',
        maxNum: '6',
        category: '백엔드',
        startDate: '2023-09-10',
        endDate: '2023-11-15',
        skill: 'Java SpringBoot',
        discription: '카카오톡 클론 코딩으로 실력 함께 키우실 분 구합니다. MSA 전문가 적극 환영',
    };

    return (
        <>
            <div>
                <div className="max-w-screen-md mx-auto p-4">
                    {/* 글 상세 내용 */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">{post.createdBy}</span>
                            <span className="mr-4">{post.createdAt}</span>
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">모집인원 {post.maxNum}</span>
                            <span className="mr-4">스터디 기간 {post.startDate}</span><span>{post.endDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">사용언어 {post.skill}</span>
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="text-2xl">소개</div>
                        <div className="mt-10 mb-10">
                            <p className="text-gray-800 dark:text-gray-200">{post.discription}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            신청
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};


export default StudyRoomNotLogin;