import axios from 'axios';

//Qna 생성
export const CreateQna = async (qnaData) => {

    try {
        const token = localStorage.getItem("token");

        console.log(token);

        const response = await axios.post('/api/admin/v1/qna', qnaData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('qna error', error);
    }
};


// Qna 단일 조회 
export async function fetchQnaDetail(qnaId) {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }

        const response = await axios.get(`/api/v1/qna/${qnaId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log('data 잘 넘어오는 지 확인', response.data);
        return response.data; // 성공적인 응답의 데이터를 반환


    } catch (error) {
        console.error("API 요청 중 오류 발생", error);
        throw error;
    }
};

// 공지사항 수정 후 저장 버튼 
export const saveNotice = async (qnaId, qnaTitle, qnaContent) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
            throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }

        const response = await axios.put(`/api/admin/v1/qna/${qnaId}`, {
            title: qnaTitle,
            content: qnaContent,
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
        console.error('변경사항 저장 중 오류 발생:', error);
        throw error; // 오류를 상위 컴포넌트로 전파
    }
};

// Qna 목록 조회
export async function fetchQnaList() {

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
            throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }
        const response = await axios.get('/api/v1/qna', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            
        });
        console.log("목록 응답 성공");
        // 성공적인 응답의 데이터를 반환
        return response.data;
        
    } catch (error) {
        console.error('API 요청 중 오류 발생', error);
        throw error;
    }
};

export const fetchReply = async (qnaId) => {

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
            throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }
        const response = await axios.get(`/api/v1/qna-reply/${qnaId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        // 성공적인 응답의 데이터를 반환
        return response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생', error);
        throw error;
    }
};
