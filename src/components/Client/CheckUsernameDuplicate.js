// import { useEffect, useState } from "react";


// // 아이디 중복 확인을 위한 함수
// export default function CheckUsernameDuplicate  (username) {
// const [data,setData] = useState(null);


// const fetchData = async (setData) => {
//   try {

//     const response = await fetch('http://localhost:8081/api/user-name/${username}/exists', {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
      
//     }

//     );
    
  
  
//     // HTTP 응답 코드 확인
//     if (!response.ok) {
//       throw new Error("서버 응답이 실패했습니다.");
//     }
  
//     // JSON 데이터 파싱
//     const data = await response.json();
//     setData(data);
  
//     // 응답 데이터에 따라 처리
//     if (data.code === 1) {
//       // 사용 가능한 아이디
//       alert("사용 가능한 아이디입니다.");
//     } else if (data.code === -1) {
//       // 이미 사용 중인 아이디
//       alert("이미 사용 중인 아이디입니다.");
//     } else {
//       // 기타 상황 처리
//       alert("아이디 확인 중에 오류가 발생했습니다.");
//       console.log(data.msg);
//     }
  
 
// } catch (error) {
//   // 네트워크 오류 또는 예외 처리
//   console.error("아이디 확인 중 오류:", error);
//   alert("아이디 확인 중에 오류가 발생했습니다.");
// }
// };

     
  // };
