import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import {
  getUserNotifications,
  changeReadStatus,
  deleteNotification,
} from "../../services/NorificationService";
import { AuthContext } from "../../context/AuthContext";


export default function NotificationPage({ notification }) {

  const [notifications, setNotifications] = useState([]);
  const [isRead, setIsRead] = useState(notifications.readStatus);
  const { authData } = useContext(AuthContext);

  // 알림 불러오기
  useEffect(() => {
    async function getUserNotificationList() {
      try {
        const response = await getUserNotifications();
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("알림 목록 불러오기 실패", error);
      }
    }
    getUserNotificationList();
  }, []);

  // 알림 읽음 상태 변경
  const handleMarkAsRead = async (notificationId) => {
    try {
      const confirmed = window.confirm(
        "정말로 이 알림을 읽음으로 표시하시겠습니까?"
        );
      if (confirmed) {
          await changeReadStatus(notificationId, true);
          setIsRead(true);
        console.log(`알림 ${notificationId}를 읽음으로 표시했습니다.`);
        window.location.reload();
      } else {
        console.log("취소되었습니다.");
      }
    } catch (error) {
      console.log("알림 읽음 상태 업데이트에 실패했습니다.", error);
    }
  };

  // 알림 삭제
  const handleDelete = async (notificationId) => {
    try {
      const confirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmed) {
        await deleteNotification(notificationId);
        // 알림 삭제 후 해당 알림 제거
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
      } else {
        console.log("취소되었습니다.");
      }
    } catch (error) {
      console.log("알림 삭제에 실패했습니다.", error);
    }
  };

  return (
    <div className="ml-56 mr-56 mt-12">
      <Card className="h-full w-auto mx-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography>
                <span className="text-green-500 font-bold">
                  {authData.nickname}
                </span>{" "}
                <span className="text-black-500 font-bold">님의 알림 목록</span>
              </Typography>
            </div>
          </div>
        </CardHeader>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  번호
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  스터디룸
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  내용
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  날짜
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="sr-only">Read</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notifications) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    key={notifications.id}
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {notifications.id}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {notifications.studyName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {notifications.message}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {notifications.createdAt}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      className={
                        notifications.readStatus
                          ? "font-medium text-center text-black-600 dark:text-blue-500 hover:underline"
                          : "font-medium text-center text-blue-600 dark:text-blue-500 hover:underline"
                      }
                      onClick={() => handleMarkAsRead(notifications.id)}
                    >
                      {notifications.readStatus ? "확인" : "미확인"}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      onClick={() => handleDelete(notifications.id)}
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      삭제
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
