import axios from 'axios';

//Qna 댓글 생성
export const createQnaReply = async (qnaId, replyData) => {

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`/api/v1/qna-reply/${qnaId}`, replyData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

       
        return response.data;

    } catch (error) {
        console.log("service : "+ qnaId)
        console.log("service : "+ replyData.comment)
        console.error('qna error', error);
    }
};

//Qna 댓글 삭제
export async function deleteQnaReply(qnaId, replyId){
    const token = localStorage.getItem("token");
    await axios.delete(`/api/v1/qna-reply/${qnaId}/${replyId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};