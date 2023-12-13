import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AdminSidebar from "./AdminSidebar";
// import SkillFilter from "../Main/SkillFilter";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";

export default function ModifySkill() {
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);
    const [selectedPosition, setSelectedPosition] = useState("");  // 컴포넌트의 상태 
    const [selectedSkills, setSelectedSkills] = useState([])

    const handlePositionChange = (e) => {
        setSelectedPosition(e.target.value);
        setPosition({ position: e.target.value }); // Update this line
    };

    const [position, setPosition] = useState({
        position: "",
    });

    const [skill, setSkill] = useState({
        skillNames: "",
    });

    const [list, setList] = useState([]);

    const handlePost = async () => {
        const payload = {
            skillName: skill.skillNames,
            position: position.position
        };

        try {
            await axios.post(`/api/admin/v1/addskill`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    setPosition({ position: response.data.data.position || '' });
                    setSkill({ skill: response.data.data.skill || '' }); // 가져온 데이터로 essay 상태를 업데이트

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("스택 등록 성공");
                    } else {
                        console.log("스택 등록 실패");
                    }
                });
        } catch (error) {
            console.error("스택 등록 중 오류 발생 : ", error);
        }
    };

    const handleGetSkills = async () => {
        try {
            let url = `/api/get-skills`;

            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log(response.data);

                    setList(response.data.data || []);

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("스킬 목록 조회 성공");
                    } else {
                        console.log("스킬 목록 조회 실패");
                    }
                });
        } catch (error) {
            console.error("스킬 목록 조회 중 오류 발생 : ", error);
            console.log(error.response);
        }
    }

    useEffect(() => {
        handleGetSkills(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
    });

    return (
        <>
            <AdminSidebar />
            <div className="ml-56 mt-12">
                <div className="flex gap-4 mx-4">
                    <div className="w-1/4">
                        <Card className="h-full w-auto mx-4">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            사용자 기술 스택 수정
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="flex items-center">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal ml-3 mr-3"
                                                    >
                                                        포지션
                                                    </Typography>
                                                    <div className="ml-12">
                                                        <select
                                                            id="position"
                                                            name="position"
                                                            value={position.position}
                                                            onChange={handlePositionChange}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-5 mr-5"
                                                        >
                                                            {/* 범위 선택 방식으로 변경하기  */}
                                                            <option value="">선택</option>
                                                            <option value="Frontend">프론트엔드</option>
                                                            <option value="Backend">백엔드</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal ml-3 mr-3"
                                                    >
                                                        기술 스택 입력
                                                    </Typography>
                                                    <input
                                                        id="skill"
                                                        className="block p-2.5 max-w-[400px] mt-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4 mr-4"
                                                        value={skill.skillNames || ''}
                                                        onChange={(e) => setSkill({ ...skill, skillNames: e.target.value })}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex justify-center mt-10 p-20">
                                    <button
                                        type="submit"
                                        onClick={handlePost}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        완료
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                    </div >
                    <div className="w-1/4">
                        <Card className="h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            기술 스택 목록
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            <div className="flex flex-col">
                                                <div className="sm:-mx-6 lg:-mx-8">
                                                    <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                                                        <div className="overflow-y-auto max-h-[300px]">
                                                            <table className="min-w-full text-left text-sm font-light">
                                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-4">스택</th>
                                                                        <th scope="col" className="px-6 py-4">구분</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {list.map((item, index) => (
                                                                        <tr
                                                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                                            <td className="whitespace-nowrap px-6 py-4">{item.skillName}</td>
                                                                            <td className="whitespace-nowrap px-6 py-4">{item.position}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>

                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}