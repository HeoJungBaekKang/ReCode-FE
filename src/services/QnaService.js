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
        console.error('qna error', error);
        console.error('qna error', error);
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
        console.error('API 요청 중 오류 발생', error);
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
        const response = await axios.get(`/api/v1/qna/${qnaId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;

    } catch (error) {
        console.error("API 요청 중 오류 발생", error);
        throw error;
    }
};

// Qna 수정
export const saveQna = async (qnaId,qnaModifyData ) => {
    console.log("userId"+qnaModifyData.loginUser)
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
        console.error('변경사항 저장 중 오류 발생:', error);
        console.log("userId"+qnaModifyData.loginUser)
        throw error;
    }
};

//Qna 삭제
export async function deleteQna(qnaId){
    const token = localStorage.getItem("token");
    await axios.delete(`/api/v1/qna/${qnaId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

// //Qna 댓글 목록 조회
// export const fetchReply = async (qnaId) => {

//     try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             // 토큰이 없는 경우에 대한 처리 (예: 로그인 페이지로 리디렉션)
//             throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
//         }
//         const response = await axios.get(`/api/v1/qna-reply/${qnaId}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             }
//         });
//         return response.data;

//     } catch (error) {
//         console.error('API 요청 중 오류 발생', error);
//         throw error;
//     }
// };
