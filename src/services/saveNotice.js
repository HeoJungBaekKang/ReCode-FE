import axios from 'axios';

export const saveNotice = async (noticeId, noticeTitle, noticeContent) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
          // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
          throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }

        const response = await axios.post(`http://localhost:8081/api/admin/v1/notice/${noticeId}`, {
            title: noticeTitle,
            content: noticeContent,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
              }
        }
        );

        // response.data에는 API 응답이 포함됩니다.
        return response.data; // 성공적으로 처리된 경우 응답 데이터 반환
    } catch (error) {
        console.error('변경사항 저장 중 오류 발생:', error);
        throw error; // 오류를 상위 컴포넌트로 전파
    }
};
