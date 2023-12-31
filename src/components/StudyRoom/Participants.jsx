import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { IconButton, Tooltip } from "@material-tailwind/react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Participants() {

  const { study_id, member_id } = useParams();
  const { authData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [info, setInfo] = useState({
    username: "",
    masterNickname: "",
  });

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/study/${study_id}/memberlist`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        setUsers(response.data.data);
      } catch (error) {
      }
    };

    fetchData();
  }, [study_id]);

  // 멤버 내보내기
  const handleLeaveStudy = async (member_id) => {
    try {
      const response = await axios.delete(
        `/api/v1/${study_id}/member/${member_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      // 탈퇴 성공 시 사용자 목록 업데이트
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== member_id)
      );
    } catch (error) {
    }
  };

  const checkMaster = async () => {
    try {
      await axios
        .get(`/api/v1/study/${study_id}/check-master`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        })
        .then((response) => {

          const code = response.data.code;

          if (code === 1) {
            setInfo({ ...info, username: response.data.data.username });
          } else {
          }
        });
    } catch (error) {
    }
  };

  useEffect(() => {
    if (study_id) {
      checkMaster();
    } else {
    }
  }, [study_id]);

  return (
    <>
      <StudyRoom_Sidebar />
      <div className="ml-76 mt-12">
      </div>
      <div className="ml-80">
        <div className="text-xl">스터디 참가 인원</div>
        <div className="sm:-mx-6 lg:-mx-10">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-10">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      이름
                    </th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    // 탈퇴한 사용자는 보이지 않도록
                    if (user.nickname === "탈퇴한 회원입니다") {
                      return null;
                    }

                    return (
                      <tr
                        key={user.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.nickname}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Tooltip content="내보내기">
                            <IconButton
                              variant="text"
                              onClick={() => handleLeaveStudy(user.id)}
                            >
                              <UserMinusIcon className="h-4 w-4 " />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
