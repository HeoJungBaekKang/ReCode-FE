import axios from "axios";

// 스킬을 불러오는 서비스 함수
export async function getSkills() {
  try {
    const response = await axios.get(`http://localhost:8081/api/get-skills`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const code = response.data.code;
    if (code === 1) {
      console.log("스택 목록 불러오기 성공");

      const skillNames = response.data.data.map(skill => skill.skillName);
      return skillNames || [];
      // return response.data.data.skills || [];
    } else {
      console.log("스택 목록 불러오기 실패");
      return [];
    }
  } catch (error) {
    console.error("스택 목록 불러오기 중 오류 : ", error);
    console.log(error.response);
    return [];
  }
}

// 스터디 목록을 불러오는 함수
export async function getStudies() {
  try {
    const response = await axios.get("http://localhost:8081/api/main/list", {
      headers: {
        "Content-Type": "applicaion/json",
      },
    });

    if (response.data.code === 1) {
      console.log("스터디 목록 불러오기 성공");
      return response.data.data; // 스터디 목록 반환
    } else {
      console.log("스터디 목록 불러오기 실패");
      return [];
    }
  } catch (error) {
    console.error("스터디 목록 불러오기 중 오류 ", error);
    return [];
  }
}

// API를 호출하여 스터디 목록 가져오는 함수
export async function fetchStudyList(authData) {
  try {
    const headers = authData.userId
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        }
      : {
          "Content-Type": "application/json",
        };

    const response = await axios.get(`http://localhost:8081/api/main/list`, {
      headers,
    });
    console.log("나 호출 됐어요! ", response);
    return response.data;
  } catch (error) {
    console.error("스터디 목록 조회 중 오류 : ", error);
    return { code: -1, data: [], message: "스터디 목록 불러오기 실패" };
  }
}
