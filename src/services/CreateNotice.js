import axios from "axios";


const CreateNotice = async(noticeData) => {

  try {
    const token = localStorage.getItem("token");

    console.log(token);

    const response = await axios.post('http://localhost:8081/api/admin/v1/notice', noticeData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('공지사항 생성 중 오류 발생', error);
  }
}

export default CreateNotice;