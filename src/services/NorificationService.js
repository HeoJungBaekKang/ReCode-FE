import axios from "axios";

// 사용자의 스터디 알림 목록을 가져오는 서비스 함수
export const getUserNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    // 로그인 되어 있지 않으면 null 반환
    if (!token) {
      return null;
    }
    const response = await axios.get(
      `/api/v1/notification/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 사용자의 스터디 메시지 읽음 상태를 바꿔주는 함수
export const changeReadStatus = async (id, readStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `/api/v1/notification/mark-as-read`,
      { id: id, readStatus: readStatus },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 알림 삭제
export const deleteNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/v1/notification/${notificationId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
