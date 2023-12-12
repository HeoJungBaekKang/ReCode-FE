import axios from "axios";

// 사용자의 스터디 알림 목록을 가져오는 서비스 함수
export const getUserNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log(token);

    const response = await axios.get(
      `/api/v1/notification/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("알림 불러오기 중 오류 발생", error);
    throw error;
  }
};

// 사용자의 스터디 메시지 읽음 상태를 바꿔주는 함수
export const changeReadStatus = async (id, readStatus) => {
  try {
    const token = localStorage.getItem("token");

    console.log(token);

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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("알림 불러오기 중 오류 발생", error);
    throw error;
  }
};

// 알림 삭제
export const deleteNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    await axios.delete(
      `/api/v1/notification/${notificationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("알림 삭제에 실패했습니다.", error);
    throw error;
  }
};
