import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import { useParams } from "react-router-dom";

const Attendance = () => {

    const { study_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [isAttended, setIsAttended] = useState(false);     // 출석체크 상태
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
            const response = await axios.post(`/api/v1/study/${study_id}/attendance`, {
                studyId: study_id,
                userId: authData.id,  // 현재 로그인한 사용자의 ID
                status: 'Checked'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });

            console.log("HTTP status: ", response.status);
            if (response.status === 201) {  // HTTP Status Code가 201이면 성공

                console.log("Response data status: ", response.data.status);

                setIsAttended(true);  // 출석체크 상태를 변경
                console.log(response.data);  // 응답 데이터 출력

                if (response.data.data.status === '출석') {
                    console.log("11111111", response.data.data.status);
                    alert("출석하였습니다.");
                } else if (response.data.data.status === '지각') {
                    console.log("22222222", response.data.data.status);
                    alert("지각입니다.");
                }
            }

        } catch (error) {
            console.error("Error on Attendance Check: ", error);
            console.log(error.response.data);  // 에러 데이터 출력

            if (error.response && error.response.data.message.includes("이미 출석되었습니다.")) {
                alert("이미 출석되었습니다.");
            }
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
                    <div className="relative mt-1 flex">
                        <button
                            onClick={handleAttendanceCheck}
                            className="px-4 py-2 w-auto ml-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            출석
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;