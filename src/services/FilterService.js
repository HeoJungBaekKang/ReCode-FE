import axios from "axios";

// 스킬을 불러오는 서비스 함수
export async function getSkills() {
  try {
    const response = await axios.get(`/api/get-skills`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const code = response.data.code;
    if (code === 1) {
      console.log(response.data, "스택 목록 불러오기 성공");

      const skillNames = response.data.data.map((skill) => skill.skillName);
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
    const response = await axios.get("/api/main/list", {
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

    const response = await axios.get(`/api/main/list`, {
      headers,
    });
    console.log("나 호출 됐어요! ", response);
    return response.data;
  } catch (error) {
    console.error("스터디 목록 조회 중 오류 : ", error);
    return { code: -1, data: [], message: "스터디 목록 불러오기 실패" };
  }
}

// 선택된 포지션에 따라서 스킬 이름 불러오는 메서드
export async function getSkillNameByPosition(position) {
  try {
    const response = await axios.get(
      `/api/skills/get-skillName?position=${position}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("왜 안오냐구", response);
    const code = response.data.code;
    if (code === 1) {
      console.log(response.data, "position에 따른 스택 목록 불러오기 성공");

      const skillNames = response.data.data.map((skill) => skill.skillName);
      return skillNames || [];
      // return response.data.data.skills || [];
    } else {
      console.log("position에 따른 스택 목록 불러오기 실패");
      return [];
    }
  } catch (error) {
    console.error("position에 따른 스택 목록 불러오기 중 오류 : ", error);
    console.log(error.response);
    return [];
  }
}

// 각 skill들의 position을 중복없이 가져오는 메서드 
export async function getPosition() {
  try {
    const response = await axios.get(
      `/api/skills/get-positions}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("왜 안오냐구", response);
    const code = response.data.code;
    if (code === 1) {
      console.log(response.data, "position 중복 없이 불러오기 성공");

      const position = response.data.data.map((skill) => skill.position);
      return position || [];
      // return response.data.data.skills || [];
    } else {
      console.log("position 중복 없이 불러오기 실패");
      return [];
    }
  } catch (error) {
    console.error("position 중복 없이 불러오기 중 오류 : ", error);
    console.log(error.response);
    return [];
  }
}

// 검색
export const handleSearchKeyword = async (searchTerm) => {
  try {
      const response = await axios.get(`/api/main/list`, { params: { keyword: searchTerm } });
      // setResults(response.data);
      console.log("제발 오세요 ",searchTerm);
      console.log("response.data 이건 서비스에 도착  :" , response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching search results', error);
  }
};

