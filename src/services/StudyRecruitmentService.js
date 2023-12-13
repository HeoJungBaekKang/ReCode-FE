import axios from "axios";

const API_URL = "http://52.79.108.89:8080"; // 백엔드 API 주소


// 스터디 모집 글 작성 서비스
export const createStudyRecruitment = async (studyRecruitmentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/api/v1/study`, studyRecruitmentData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
