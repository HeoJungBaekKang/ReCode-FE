import axios from 'axios';

//Qna 생성
export const createQna = async (qnaData) => {

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post('/api/v1/qna', qnaData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.data;

    } catch (error) {
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
        return response.data;

    } catch (error) {
        throw error;
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
        return response.data;

    } catch (error) {
        throw error;
    }
};

// Qna 수정
export const saveQna = async (qnaId, qnaModifyData) => {

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
            throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
        }

        const response = await axios.put(
            `/api/v1/qna/${qnaId}`,
            {
                userId: qnaModifyData.loginUser,
                title: qnaModifyData.qnaTitle,
                content: qnaModifyData.qnaContent,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        throw error;
    }
};

//Qna 삭제
export async function deleteQna(qnaId) {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/v1/qna/${qnaId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
