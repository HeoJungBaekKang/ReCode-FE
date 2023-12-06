import React, { useState } from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";


const Attendance = () => {

    // test
    const date = {
        StudyDate: '2023-11-10 ~ 2023-11-13',
        StudySchedule: '2023-11-10(금)  14:00 ~ 15:00',
    };

    // 출석체크 상태
    const [isAttended, setIsAttended] = useState(false);

    // 출석 완료된 아이디 목록
    const [attendedUsers, setAttendedUsers] = useState([]);


    // 출석체크 버튼을 클릭할 때 실행되는 함수
    const handleAttendanceCheck = () => {

        // 여기에 출석체크 확인 로직을 구현
        // 예를 들어, API 호출 또는 로컬 상태 업데이트 등이 포함될 수 있음

        // 출석체크가 완료되면 isAttended 상태를 업데이트
        setIsAttended(true);

        // 출석 완료된 사용자 아이디 추가
        // 예를 들어, 현재 로그인된 사용자의 아이디를 사용하거나 다른 사용자 정보를 가져와야 함
        const userId = "huno";
        setAttendedUsers([...attendedUsers, userId]);
    };

    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-3xl font-semibold mb-10">출석 체크</label>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="text-sm mr-12 font-semibold">스터디 기간</span>
                        <span className="text-sm">{date.StudyDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="text-sm mr-4 font-semibold">금일 스터디 시간</span>
                        <span className="text-sm">{date.StudySchedule}</span>
                    </div>
                </div>

                <div className="max-w-screen-md mx-auto p-4">
                    {/* 출석체크 버튼 */}
                    {!isAttended && (
                        <div className="relative mt-1 flex">
                            <button
                                onClick={handleAttendanceCheck}
                                className="px-4 py-2 w-auto ml-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                출석체크
                            </button>


                            {/* 출석체크 상태에 따라 메시지 표시 */}
                            {isAttended && (
                                <div className="text-green-500 mt-4 font-semibold">
                                    출석체크 완료
                                </div>
                            )}
                        </div>
                    )}


                    {/* 출석체크 상태에 따라 메시지 표시 */}
                    {isAttended && (
                        <div>
                            <div className="text-green-500 mt-4 font-semibold">
                                출석체크 완료
                            </div>

                            {/* 출석 완료된 사용자 목록 표시 */}
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2">출석 완료</h3>
                                <ul>
                                    {attendedUsers.map((user, index) => (
                                        <li key={index}>{user}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Attendance;