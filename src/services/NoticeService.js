import axios from 'axios';

// 공지사항 삭제 
export async function deleteNotice(noticeId) {
  const token = localStorage.getItem("token");
  await axios.delete(`/api/admin/v1/notice/${noticeId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

// 공지사항 작성 
export const CreateNotice = async (noticeData) => {

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post('/api/admin/v1/notice', noticeData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })

    return response.data;
  } catch (error) {
  }
};


// 공지사항 상세보기 
export async function fetchNoticeDetail(noticeId) {

  try {
    const response = await axios.get(`/api/notice-detail/${noticeId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data; // 성공적인 응답의 데이터를 반환


  } catch (error) {
    throw error;
  }
};

// 공지사항 수정 후 저장 버튼 
export const saveNotice = async (noticeId, noticeTitle, noticeContent) => {
  try {

    const token = localStorage.getItem("token");

    if (!token) {
      // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
      throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
    }

    const response = await axios.post(`/api/admin/v1/notice/${noticeId}`, {
      title: noticeTitle,
      content: noticeContent,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
    );

    // response.data에는 API 응답이 포함됩니다.
    return response.data; // 성공적으로 처리된 경우 응답 데이터 반환
  } catch (error) {
    throw error; // 오류를 상위 컴포넌트로 전파
  }
};

// 공지사항 목록 조회
export async function fetchNoticeList() {

  try {
    const response = await axios.get('/api/notice-list', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // 성공적인 응답의 데이터를 반환
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 키워드 검색 
export const handleSearchKeyword = async (searchType, searchTerm, setResults) => {
  try {
    const response = await axios.get(`/api/notice-search`, { params: { [searchType]: searchTerm } });
    return response.data;
  } catch (error) {
  }
};