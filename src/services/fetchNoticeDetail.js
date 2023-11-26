import axios from "axios";

async function fetchNoticeDetail(noticeId) {


  try {
    const token = localStorage.getItem("token");

    if (!token) {
      // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
      throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
    }

  const response = await axios.get(`http://localhost:8081/api/v1/notice-detail/${noticeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  });
    console.log('data 잘 넘어오는 지 확인', response.data);
    return response.data; // 성공적인 응답의 데이터를 반환

    
  } catch (error) {
    console.error("API 요청 중 오류 발생", error);
    throw error;
  }
}
export default fetchNoticeDetail;
