import axios from 'axios';

//Qna 댓글 생성
export const createQnaReply = async (qnaId, replyData) => {

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8081/api/v1/qna-reply/${qnaId}`, replyData, {
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