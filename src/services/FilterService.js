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

      const skillNames = response.data.data.map((skill) => skill.skillName);
      return skillNames || [];
    } else {
      return [];
    }
  } catch (error) {
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
      return response.data.data; // 스터디 목록 반환
    } else {
      return [];
    }
  } catch (error) {
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
    return response.data;
  } catch (error) {
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
    const code = response.data.code;
    if (code === 1) {

      const skillNames = response.data.data.map((skill) => skill.skillName);
      return skillNames || [];
    } else {
      return [];
    }
  } catch (error) {
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
    const code = response.data.code;
    if (code === 1) {

      const position = response.data.data.map((skill) => skill.position);
      return position || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// 검색
export const handleSearchKeyword = async (searchTerm) => {
  try {
    const response = await axios.get(`/api/main/list`, { params: { keyword: searchTerm } });
    return response.data;
  } catch (error) {
  }
};
