import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { useParams } from "react-router-dom";

const Attendance = () => {

    const { study_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [isAttended, setIsAttended] = useState(false);     // 출석체크 상태
    const [attendedUsers, setAttendedUsers] = useState([]);  // 출석 완료된 아이디 목록
    const [studyInfo, setStudyInfo] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        attendanceDay: ""
    });

    useEffect(() => {
        const fetchStudyInfo = async () => {
            try {
                const response = await axios.get(`/api/study/${study_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`,
                    },
                });
                console.log("Response.Data", response.data);
                if (response.data) {
                    setStudyInfo({
                        startDate: response.data.data.startDate,
                        endDate: response.data.data.endDate,
                        startTime: response.data.data.startTime,
                        endTime: response.data.data.endTime,
                        attendanceDay: Array.isArray(response.data.data.attendanceDay) ? response.data.data.attendanceDay.join(", ") : ""
                    });
                } else {
                    console.error("Unexpected response data structure");
                }
            } catch (error) {
                console.error("Error Fetching Study Info: ", error);
            }
        };
        fetchStudyInfo();
    }, [study_id, authData.token]);

    const handleAttendanceCheck = async () => {
        try {
            console.log(study_id);
            console.log(authData.user_id);
            const response = await axios.post(`/api/v1/study/${study_id}/attendance`, {
                studyId: study_id,
                userId: authData.user_id,  // 현재 로그인한 사용자의 ID
                status: 'Checked'  // 출석 상태를 출석으로 설정
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
    
            if (response.status === 200) {  // HTTP Status Code가 200이면 성공
                setIsAttended(true);  // 출석체크 상태를 변경
            }
        } catch (error) {
            console.error("Error on Attendance Check: ", error);
        }
    }


    return (
        <div>
            <StudyRoom_Sidebar />
            <div className="max-w-screen-md mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <label className="block text-3xl font-semibold mb-10">출석 체크</label>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="text-sm mr-12 font-semibold">스터디 기간</span>
                        <span className="text-sm">{studyInfo.startDate} ~ {studyInfo.endDate}, [{studyInfo.attendanceDay}]</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <span className="text-sm mr-4 font-semibold">출석 인정 시간</span>
                        <span className="text-sm">{studyInfo.startTime} ~ {studyInfo.endTime}</span>
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
                                출석
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