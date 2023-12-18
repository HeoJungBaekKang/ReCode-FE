// StudyRecruitmentService.js

import axios from "axios";

const API_URL = "http://localhost:8081"; // 백엔드 API 주소

// 스터디 모집 글 작성 서비스
export const createStudyRecruitment = async (studyRecruitmentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/v1/study`,
      studyRecruitmentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 스터디 모집 글 수정 (스터디 관리자)
export const updateStudy = async (
  title,
  maxNum,
  studyId,
  mergedSkills,
  description,
  attendanceDay,
  formattedStartTime,
  formattedEndTime,
  startDate,
  endDate,
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `/api/v1/study/${studyId}/modify`,{
        title : title,
        maxNum : maxNum,
        skillNames : mergedSkills,
        description : description,
        attendanceDay : attendanceDay,
        startDate : startDate,
        startTime :formattedStartTime,
        endTime :formattedEndTime,
        endDate : endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // 성공적으로 업데이트된 스터디 데이터 반환
  } catch (error) {
    throw error.response.data; // 에러 발생 시 서버 응답 데이터를 던짐
  }
};
