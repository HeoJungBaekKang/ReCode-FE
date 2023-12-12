import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

export default function Estimate() {


    const navigate = useNavigate();

    const { study_id, member_id } = useParams();
    const { authData } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const questions = [
        {
            text: "스터디에 잘 참여했나요?",
            options: [
                { text: "매우 나쁨", value: "13" },
                { text: "나쁨", value: "27" },
                { text: "보통", value: "40" },
                { text: "좋음", value: "53" },
                { text: "아주 좋음", value: "67" },
            ]
        },
        {
            text: "다시 같이 하고 싶은 멤버인가요?",
            options: [
                { text: "매우 나쁨", value: "13" },
                { text: "나쁨", value: "27" },
                { text: "보통", value: "40" },
                { text: "좋음", value: "53" },
                { text: "아주 좋음", value: "67" },
            ]
        },
        {
            text: "협력이 잘 이루어 졌나요?",
            options: [
                { text: "매우 나쁨", value: "13" },
                { text: "나쁨", value: "27" },
                { text: "보통", value: "40" },
                { text: "좋음", value: "53" },
                { text: "아주 좋음", value: "67" },
            ]
        },
        {
            text: "스터디에 대한 이해도가 어느정도 였나요?",
            options: [
                { text: "매우 나쁨", value: "13" },
                { text: "나쁨", value: "27" },
                { text: "보통", value: "40" },
                { text: "좋음", value: "53" },
                { text: "아주 좋음", value: "67" },
            ]
        },
        {
            text: "다른 스터디에 추천해주고 싶으신가요?",
            options: [
                { text: "매우 나쁨", value: "13" },
                { text: "나쁨", value: "27" },
                { text: "보통", value: "40" },
                { text: "좋음", value: "53" },
                { text: "아주 좋음", value: "67" },
            ]
        },
    ];

    const [info, setInfo] = useState({
        username: "",
        masterNickname: ""
    });


    // 각 문항별로 선택된 점수를 저장하는 상태
    const [selectedScores, setSelectedScores] = useState({});

    // 사용자 ID와 문항 인덱스를 기반으로 점수를 저장합니다.
    const handleSelectionChange = (userId, questionIndex, score) => {
        setSelectedScores(prevScores => ({
            ...prevScores,
            [`${userId}-${questionIndex}`]: score
        }));
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
        console.log('handlePost 호출됨');

        // 각 사용자에 대해 반복
        for (const user of users) {
            // 각 질문에 대해 반복
            for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
                // 현재 사용자와 질문에 대한 점수 가져오기
                const scoreKey = `${user.id}-${questionIndex}`;
                const scoreValue = selectedScores[scoreKey];

                // 점수가 선택되었는지 확인
                if (scoreValue) {
                    try {
                        const response = await axios.post(`http://localhost:8081/api/v1/study/${study_id}/estimate/${user.id}`, {
                            studyId: study_id,
                            userId: user.id,
                            point: parseInt(scoreValue, 10) // 정수로 변환
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authData.token}`
                            }
                        });
                        console.log("평가 결과:", response.data);
                    } catch (error) {
                        console.log("평가 결과 제출 중 오류 발생: ", error.response || error);
                    }
                }
            }
        }
    };

    return (
        <>
            {users.map((user, userIndex) => (
                <div key={user.id} className="ml-56 mr-56 mt-20">
                    <div className="flex items-center mr-5 whitespace-nowrap w-auto">
                        <span className="flex items-center mr-2 whitespace-nowrap w-auto text-green-500 font-bold">
                            {user.nickname}
                        </span>{" "}
                        <span className="text-black-500 font-bold">님 환영합니다.</span>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
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
                                {questions.map((question, questionIndex) => (
                                    <tr key={questionIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {question.text}
                                        </th>
                                        {question.options.map((option, optionIndex) => (
                                            <td key={optionIndex} className="px-6 py-4">
                                                <div className="flex items-center me-4">
                                                    <input
                                                        id={`radio-${user.id}-${questionIndex}-${optionIndex}`}
                                                        type="radio"
                                                        value={option.value}
                                                        name={`colored-radio-${user.id}-${questionIndex}`}
                                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={() => handleSelectionChange(`${user.id}-${questionIndex}`, option.value)}
                                                    />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
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