import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

export default function Estimate() {


    const navigate = useNavigate();

    const { study_id, member_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const [info, setInfo] = useState({
        username: "",
        masterNickname: ""
    });

    const [estimate, setEstimate] = useState({
        studyId: study_id,
        userId: users.id,
        point: ""
    });

    const [selectedScores, setSelectedScores] = useState({});

    const handleSelectionChange = (userId, score) => {
        setSelectedScores({
            ...selectedScores,
            [userId]: users.id
        });
    };

    // 사용자 데이터 가져오기
    useEffect(() => {

        const fetchData = async () => {
            console.log("유저정보", users);
            try {
                const response = await axios.get(`http://localhost:8081/api/v1/study/${study_id}/memberlist`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    }
                });
                console.log("스터디룸 인원 목록을 가져오는데 성공:", response.data);
                setUsers(response.data.data);

            } catch (error) {
                console.error("신청 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [study_id]);

    const handlePost = async (event) => {
        event.preventDefault();

        // 선택된 점수의 총합 계산
        const totalScore = Object.values(selectedScores).reduce((total, score) => total + parseFloat(score), 0);

        // 총점을 포함한 estimate 업데이트
        const updatedEstimate = { ...estimate, point: totalScore };

        try {
            await axios.post(`http://localhost:8081/api/v1/study/${study_id}/estimate/${users.id}`, estimate, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    console.log(response.data.quiz);

                    const code = response.data.code;

                    console.log("평가결과 전송 중 : ", estimate);

                    setEstimate({ estimate: response.data.data.estimate || '' });

                    if (code === 1) {
                        console.log("평가 결과 제출 성공", response.data);
                    } else {
                        console.log("평가 결과 제출 실패");
                    }
                });
        } catch (error) {
            console.log("평가 결과 제출 중 오류 발생 : ", error.response || error);
        }
    };

    return (
        <>
            {users.map((user, index) => (
                <div key={user.id} className="ml-56 mr-56 mt-20">
                    {user.nickname}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        질문
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        매우 나쁨
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        나쁨
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        보통
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        좋음
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        아주 좋음
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        스터디에 잘 참여했나요?
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input
                                                id={`red-radio-${user.id}`}
                                                type="radio"
                                                value="0.13"
                                                name={`colored-radio-${user.id}`}
                                                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={() => handleSelectionChange(user.id, 0.13)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="orange-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="yellow-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="teal-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="green-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        다시 같이 하고 싶은 멤버인가요?
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="red-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="orange-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="yellow-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="teal-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="green-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        협력이 잘 이루어 졌나요?
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="red-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="orange-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="yellow-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="teal-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="green-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        스터디에 대한 이해도가 어느정도 였나요?
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="red-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="orange-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="yellow-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="teal-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="green-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        다른 스터디에 추천해주고 싶으신가요?
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="red-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="orange-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="yellow-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="teal-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <input id="green-radio" type="radio" value="0.4" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    </th>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div class="flex items-center me-4" />
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <div class="flex items-center me-4">
                                            <button onClick={handlePost}>제출</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </>
    );
}